import { createListCollection } from '@ark-ui/react/collection';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import {
  Select,
  Sidebar,
  useSplitterContext,
  SidebarPanel,
  SidebarInset,
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
} from '../src';

const workspaces = createListCollection({
  items: [{ label: 'Acme Inc.', value: 'acme' }],
});

function DefaultSidebarConstraints() {
  const splitter = useSplitterContext();
  const panel = splitter.getPanelById('navigation');

  return <output data-testid="constraints">{`${panel.minSize}:${panel.collapsedSize}`}</output>;
}

test('keeps the default panel, inset, and resize ids aligned', async () => {
  render(
    <Sidebar panelId="navigation" data-testid="sidebar">
      <SidebarPanel data-testid="panel">
        <DefaultSidebarConstraints />
      </SidebarPanel>
      <SidebarResizeTrigger data-testid="resize" />
      <SidebarTrigger />
      <SidebarInset data-testid="inset">Content</SidebarInset>
    </Sidebar>,
  );

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
  await expect
    .element(page.getByRole('button', { name: 'Toggle sidebar' }))
    .toHaveAttribute('aria-expanded', 'true');
});

test('reverses the resize pair for a right sidebar', async () => {
  render(
    <Sidebar side="right" panelId="inspector">
      <SidebarInset />
      <SidebarTrigger />
      <SidebarResizeTrigger data-testid="resize" />
      <SidebarPanel />
    </Sidebar>,
  );

  const resize = document.querySelector<HTMLElement>('[data-testid="resize"]')!;

  expect(resize.id).toMatch(/:splitter:content:inspector$/);
  expect(resize?.getAttribute('data-side')).toBe('right');
});

test('lets consumer click handlers cancel the default toggle', async () => {
  render(
    <Sidebar>
      <SidebarPanel />
      <SidebarResizeTrigger />
      <SidebarTrigger onClick={(event) => event.preventDefault()} />
      <SidebarInset />
    </Sidebar>,
  );

  const trigger = page.getByRole('button', { name: 'Toggle sidebar' });

  await trigger.click();

  await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
});

test('preserves active link composition for primary and nested navigation', async () => {
  render(
    <Sidebar>
      <SidebarPanel>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <SidebarNavigationButton asChild active size="sm">
              <a href="#overview">Overview</a>
            </SidebarNavigationButton>
            <SidebarNavigationBadge data-testid="primary-badge">12</SidebarNavigationBadge>
            <SidebarNavigationSubList>
              <SidebarNavigationSubItem>
                <SidebarNavigationSubButton asChild active>
                  <a href="#details">Details</a>
                </SidebarNavigationSubButton>
                <SidebarNavigationBadge data-testid="nested-badge">3</SidebarNavigationBadge>
              </SidebarNavigationSubItem>
              <SidebarNavigationSubItem>
                <SidebarNavigationSubButton href="#very-long-item">
                  A very long nested navigation item
                </SidebarNavigationSubButton>
              </SidebarNavigationSubItem>
            </SidebarNavigationSubList>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset />
    </Sidebar>,
  );

  const overview = page.getByRole('link', { name: 'Overview' });
  const details = page.getByRole('link', { name: 'Details' });

  await expect.element(overview).toHaveAttribute('aria-current', 'page');
  expect([
    ...document.querySelector('[data-slot="sidebar-navigation-button"][href="#overview"]')!
      .classList,
  ]).toEqual(
    expect.arrayContaining([
      'group-data-[state=expanded]/sidebar-panel:@min-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-10',
    ]),
  );
  expect([
    ...document.querySelector('[data-slot="sidebar-navigation-button"][href="#overview"]')!
      .classList,
  ]).not.toContain('@max-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-2');
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
    .toHaveAttribute('data-slot', 'sidebar-navigation-sub-label');
});

test('preserves direct Select indicator composition in a navigation button', async () => {
  const { container } = render(
    <Sidebar>
      <SidebarPanel>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <Select collection={workspaces} defaultValue={['acme']}>
              <SelectTrigger asChild>
                <SidebarNavigationButton aria-label="Select workspace">
                  <span data-sidebar-icon>AC</span>
                  <SidebarLabel>
                    <SelectValueText placeholder="Select workspace" />
                  </SidebarLabel>
                  <SelectIndicator data-testid="select-indicator" />
                </SidebarNavigationButton>
              </SelectTrigger>
            </Select>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset />
    </Sidebar>,
  );

  const indicator = document.querySelector<HTMLElement>('[data-testid="select-indicator"]')!;

  expect(indicator).toBe(container.querySelector('[data-scope="select"][data-part="indicator"]'));
});

test('marks collapsed navigation content as hidden by default', async () => {
  render(
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
    </Sidebar>,
  );

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
  render(
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
    </Sidebar>,
  );

  await expect
    .element(page.getByRole('list'))
    .toHaveAttribute('data-slot', 'sidebar-navigation-list');
  await expect
    .element(page.getByRole('button', { name: 'Overview' }))
    .toHaveAttribute('data-slot', 'sidebar-navigation-button');
});

test('uses native Tailwind defaults and merges consumer utilities last', async () => {
  const { container } = render(
    <Sidebar className="h-64 bg-muted">
      <SidebarPanel className="p-6">
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <SidebarNavigationButton className="p-6">Overview</SidebarNavigationButton>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarPanel>
      <SidebarResizeTrigger className="w-2 min-w-2" />
      <SidebarTrigger className="size-8" />
      <SidebarInset />
    </Sidebar>,
  );

  const root = container.querySelector('[data-slot="sidebar-root"]');
  const panel = container.querySelector('[data-slot="sidebar-panel"]');
  expect([...document.querySelector('[data-slot="sidebar-navigation-button"]')!.classList]).toEqual(
    expect.arrayContaining([
      'group-data-[state=expanded]/sidebar-panel:@min-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-10',
    ]),
  );
  expect([
    ...document.querySelector('[data-slot="sidebar-navigation-button"]')!.classList,
  ]).not.toContain('has-[+_[data-slot=sidebar-navigation-badge]]:pe-10');
  const trigger = page.getByRole('button', { name: 'Toggle sidebar' });

  expect([...root!.classList]).toEqual(expect.arrayContaining(['h-64', 'bg-muted']));
  expect([...root!.classList]).not.toContain('h-dvh');
  expect([...root!.classList]).not.toContain('bg-background');
  expect([...panel!.classList]).toEqual(expect.arrayContaining(['p-6', 'bg-card']));
  expect([...panel!.classList]).not.toContain('p-0');
  expect([...document.querySelector('[data-slot="sidebar-navigation-button"]')!.classList]).toEqual(
    expect.arrayContaining(['p-6', 'min-h-control-md']),
  );
  expect([
    ...document.querySelector('[data-slot="sidebar-navigation-button"]')!.classList,
  ]).not.toContain('px-2');
  expect([
    ...document.querySelector('[data-slot="sidebar-navigation-button"]')!.classList,
  ]).not.toContain('py-1');
  expect([...document.querySelector('[data-slot="sidebar-trigger"]')!.classList]).toEqual(
    expect.arrayContaining(['size-8']),
  );
  expect([...document.querySelector('[data-slot="sidebar-trigger"]')!.classList]).not.toContain(
    'size-7',
  );
  await expect.element(trigger.locator('svg')).toBeVisible();
  await expect.element(trigger).toHaveCSS('width', '32px');
  await expect.element(page.locator('[data-slot="sidebar-panel"]')).toHaveCSS('padding', '24px');
});