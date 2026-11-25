import { createListCollection } from '@ark-ui/solid/collection';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  Select,
  Sidebar,
  useSplitterContext,
  SidebarPanel,
  SidebarInset,
  SidebarInput,
  SidebarSeparator,
  SidebarResizeTrigger,
  SidebarTrigger,
  SidebarLabel,
  SidebarExpandedContent,
  SidebarCollapsedContent,
  SidebarGroup,
  SidebarGroupHeader,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarNavigationList,
  SidebarNavigationItem,
  SidebarNavigationButton,
  SidebarNavigationBadge,
  SidebarNavigationSubList,
  SidebarNavigationSubItem,
  SidebarNavigationSubButton,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  useSidebar,
} from '@/index';

const workspaces = createListCollection({
  items: [{ label: 'Acme Inc.', value: 'acme' }],
});

function DefaultSidebarConstraints() {
  const splitter = useSplitterContext();
  const panel = () => splitter().getPanelById('navigation');

  return <output data-testid="constraints">{`${panel().minSize}:${panel().collapsedSize}`}</output>;
}

test.each([false, true])('supports bound toggle handlers (prevented=%s)', async (prevented) => {
  const payload = { action: 'toggle' };
  const calls: unknown[] = [];
  render(() => (
    <Sidebar defaultSize={[20, 80]} style={{ width: '1000px', height: '600px' }}>
      <SidebarPanel />
      <SidebarResizeTrigger />
      <SidebarTrigger
        onClick={[
          (data, event) => {
            calls.push(data, event.currentTarget);
            if (prevented) event.preventDefault();
          },
          payload,
        ]}
      />
      <SidebarInset />
    </Sidebar>
  ));
  const trigger = page.getByRole('button', { name: 'Toggle sidebar' });
  await expect
    .element(page.getByRole('separator', { name: 'Resize sidebar' }))
    .toHaveAttribute('aria-valuenow', '20');
  await trigger.click();
  expect(calls).toEqual([payload, document.querySelector('[data-slot="sidebar-trigger"]')]);
  await expect.element(trigger).toHaveAttribute('aria-expanded', prevented ? 'true' : 'false');
});

test('keeps the default panel, inset, and resize ids aligned', async () => {
  render(() => (
    <Sidebar panelId="navigation" data-testid="sidebar">
      <SidebarPanel data-testid="panel">
        <DefaultSidebarConstraints />
      </SidebarPanel>
      <SidebarResizeTrigger data-testid="resize" />
      <SidebarTrigger />
      <SidebarInset data-testid="inset">Content</SidebarInset>
    </Sidebar>
  ));

  const panel = document.querySelector<HTMLElement>('[data-testid="panel"]')!;
  const inset = document.querySelector<HTMLElement>('[data-testid="inset"]')!;
  const resize = document.querySelector<HTMLElement>('[data-testid="resize"]')!;

  await expect.element(page.getByTestId('sidebar')).toHaveAttribute('data-side', 'left');
  expect(panel.id).toMatch(/:panel:navigation$/);
  await expect.element(page.getByTestId('constraints')).toContainText('3rem:3rem');
  expect(inset.id).toMatch(/:panel:content$/);
  expect(resize.id).toMatch(/:splitter:navigation:content$/);
  expect(resize?.getAttribute('aria-controls')).toBe(`${panel.id} ${inset.id}`);
  expect(resize?.getAttribute('aria-label')).toBe('Resize sidebar');
  expect(resize?.getAttribute('type')).toBe('button');
  await expect
    .element(page.getByRole('button', { name: 'Toggle sidebar' }))
    .toHaveAttribute('aria-expanded', 'true');
});

test('reverses the resize pair for a right sidebar', async () => {
  render(() => (
    <Sidebar side="right" panelId="inspector">
      <SidebarInset />
      <SidebarTrigger />
      <SidebarResizeTrigger data-testid="resize" />
      <SidebarPanel />
    </Sidebar>
  ));

  const resize = document.querySelector<HTMLElement>('[data-testid="resize"]')!;

  expect(resize.id).toMatch(/:splitter:content:inspector$/);
  expect(resize?.getAttribute('data-side')).toBe('right');
});

test('lets consumer click handlers cancel the default toggle', async () => {
  render(() => (
    <Sidebar>
      <SidebarPanel />
      <SidebarResizeTrigger />
      <SidebarTrigger onClick={(event: MouseEvent) => event.preventDefault()} />
      <SidebarInset />
    </Sidebar>
  ));

  const trigger = page.getByRole('button', { name: 'Toggle sidebar' });

  await trigger.click();

  await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
});

test('preserves active link composition for primary and nested navigation', async () => {
  render(() => (
    <Sidebar>
      <SidebarPanel>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <SidebarNavigationButton
              active
              size="sm"
              asChild={(props) => (
                <a {...props()} href="#overview">
                  Overview
                </a>
              )}
            />
            <SidebarNavigationBadge data-testid="primary-badge">12</SidebarNavigationBadge>
            <SidebarNavigationSubList>
              <SidebarNavigationSubItem>
                <SidebarNavigationSubButton
                  active
                  asChild={(props) => (
                    <a {...props()} href="#details">
                      Details
                    </a>
                  )}
                />
                <SidebarNavigationBadge data-testid="nested-badge">3</SidebarNavigationBadge>
              </SidebarNavigationSubItem>
              <SidebarNavigationSubItem>
                <SidebarNavigationSubButton href="#very-long-item">
                  <svg data-testid="nested-icon" />
                  <SidebarLabel>A very long nested navigation item</SidebarLabel>
                </SidebarNavigationSubButton>
              </SidebarNavigationSubItem>
            </SidebarNavigationSubList>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset />
    </Sidebar>
  ));

  const overview = page.getByRole('link', { name: 'Overview' });
  const details = page.getByRole('link', { name: 'Details' });

  await expect.element(overview).toHaveAttribute('aria-current', 'page');
  await expect.element(overview).toHaveAttribute('data-slot', 'sidebar-navigation-button');
  await expect.element(overview).toHaveAttribute('data-active');
  await expect.element(overview).toHaveAttribute('data-size', 'sm');
  await expect.element(details).toHaveAttribute('aria-current', 'page');
  await expect.element(details).toHaveAttribute('data-slot', 'sidebar-navigation-sub-button');
  await expect.element(details).toHaveAttribute('data-active');
  await expect
    .element(page.getByTestId('primary-badge'))
    .toHaveAttribute('data-slot', 'sidebar-navigation-badge');
  await expect.element(page.getByTestId('nested-badge')).toContainText('3');
  await expect
    .element(page.getByText('A very long nested navigation item'))
    .toHaveAttribute('data-slot', 'sidebar-label');
  expect(
    document.querySelector('[data-testid="nested-icon"]')?.parentElement?.getAttribute('data-slot'),
  ).toBe('sidebar-navigation-sub-button');
});

test('preserves direct Select indicator composition in a navigation button', async () => {
  const { container } = render(() => (
    <Sidebar>
      <SidebarPanel>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <Select collection={workspaces} defaultValue={['acme']}>
              <SelectTrigger
                asChild={(props) => (
                  <SidebarNavigationButton {...props()} aria-label="Select workspace">
                    <span data-sidebar-icon>AC</span>
                    <SidebarLabel>
                      <SelectValueText placeholder="Select workspace" />
                    </SidebarLabel>
                    <SelectIndicator data-testid="select-indicator" />
                  </SidebarNavigationButton>
                )}
              />
            </Select>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset />
    </Sidebar>
  ));

  const indicator = document.querySelector<HTMLElement>('[data-testid="select-indicator"]')!;

  await page.getByRole('button', { name: 'Toggle sidebar' }).click();
  await expect
    .element(page.getByRole('button', { name: 'Toggle sidebar' }))
    .toHaveAttribute('aria-expanded', 'false');

  expect(indicator).toBe(container.querySelector('[data-scope="select"][data-part="indicator"]'));
});

test('marks collapsed navigation content as hidden by default', async () => {
  render(() => (
    <Sidebar>
      <SidebarPanel>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <SidebarExpandedContent data-testid="expanded-projects">
              <button type="button">Expanded projects</button>
            </SidebarExpandedContent>
            <SidebarCollapsedContent data-testid="collapsed-projects">
              <button type="button">Collapsed projects</button>
            </SidebarCollapsedContent>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset />
    </Sidebar>
  ));

  await expect
    .element(page.getByTestId('expanded-projects'))
    .toHaveAttribute('data-slot', 'sidebar-expanded-content');
  await expect.element(page.getByTestId('expanded-projects')).not.toHaveAttribute('hidden');
  await expect
    .element(page.getByTestId('collapsed-projects'))
    .toHaveAttribute('data-slot', 'sidebar-collapsed-content');
  await expect.element(page.getByTestId('collapsed-projects')).toHaveAttribute('hidden');
});

test('composes an explicit group header', async () => {
  render(() => (
    <Sidebar>
      <SidebarPanel>
        <SidebarGroup>
          <SidebarGroupHeader>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupAction aria-label="Create workspace item">+</SidebarGroupAction>
          </SidebarGroupHeader>
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <SidebarNavigationButton>Overview</SidebarNavigationButton>
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarGroup>
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset />
    </Sidebar>
  ));

  await expect
    .element(page.getByRole('list'))
    .toHaveAttribute('data-slot', 'sidebar-navigation-list');
  await expect
    .element(page.getByRole('button', { name: 'Overview' }))
    .toHaveAttribute('data-slot', 'sidebar-navigation-button');
});

test('supports configurable panel sizes and emits sidebar-specific input/separator slots', async () => {
  function CustomConstraints() {
    const splitter = useSplitterContext();
    const panel = () => splitter().getPanelById('sidebar');

    return (
      <output data-testid="custom-constraints">
        {`${panel().minSize}:${panel().maxSize}:${panel().collapsedSize}:${panel().collapsible}`}
      </output>
    );
  }

  render(() => (
    <Sidebar minSize="5rem" maxSize="24rem" collapsedSize="4rem">
      <SidebarPanel>
        <CustomConstraints />
        <SidebarInput aria-label="Filter nav" />
        <SidebarSeparator data-testid="sidebar-sep" />
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarInset />
    </Sidebar>
  ));

  await expect
    .element(page.getByTestId('custom-constraints'))
    .toContainText('5rem:24rem:4rem:true');
  await expect
    .element(page.getByRole('textbox', { name: 'Filter nav' }))
    .toHaveAttribute('data-slot', 'sidebar-input');
  await expect
    .element(page.getByTestId('sidebar-sep'))
    .toHaveAttribute('data-slot', 'sidebar-separator');
});

test('switches to a mobile Drawer below mobileBreakpoint', async () => {
  function MobileStatus() {
    const sidebar = useSidebar();
    return (
      <output data-testid="mobile-status">{`${sidebar.isMobile()}:${sidebar.openMobile()}`}</output>
    );
  }

  render(() => (
    <Sidebar mobileBreakpoint={9999}>
      <SidebarPanel>
        <button type="button">Mobile nav link</button>
      </SidebarPanel>
      <SidebarResizeTrigger data-testid="mobile-resize" />
      <SidebarTrigger />
      <SidebarInset>
        <MobileStatus />
      </SidebarInset>
    </Sidebar>
  ));

  const trigger = page.getByRole('button', { name: 'Toggle sidebar' });
  await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect.element(page.getByTestId('mobile-status')).toContainText('true:false');
  await expect.element(page.getByTestId('mobile-resize')).toHaveAttribute('hidden');

  await trigger.click();
  await expect.element(page.getByRole('button', { name: 'Mobile nav link' })).toBeVisible();
  expect(
    document.querySelector('[data-slot="sidebar-trigger"]')?.getAttribute('aria-expanded'),
  ).toBe('true');
  expect(document.querySelector('[data-testid="mobile-status"]')?.textContent).toContain(
    'true:true',
  );
  expect(document.querySelector('[data-slot="sidebar-panel"][data-mobile]')).not.toBeNull();
});