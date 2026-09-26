import { createListCollection } from '@ark-ui/react/collection';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
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

test('keeps the default panel, inset, and resize ids aligned', () => {
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

  const panel = screen.getByTestId('panel');
  const inset = screen.getByTestId('inset');
  const resize = screen.getByTestId('resize');

  expect(screen.getByTestId('sidebar')).toHaveAttribute('data-side', 'left');
  expect(panel.id).toMatch(/:panel:navigation$/);
  expect(screen.getByTestId('constraints')).toHaveTextContent('3rem:3rem');
  expect(inset.id).toMatch(/:panel:content$/);
  expect(resize.id).toMatch(/:splitter:navigation:content$/);
  expect(resize).toHaveAttribute('aria-controls', `${panel.id} ${inset.id}`);
  expect(resize).toHaveAttribute('aria-label', 'Resize sidebar');
  expect(screen.getByRole('button', { name: 'Toggle sidebar' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
});

test('reverses the resize pair for a right sidebar', () => {
  render(
    <Sidebar side="right" panelId="inspector">
      <SidebarInset />
      <SidebarTrigger />
      <SidebarResizeTrigger data-testid="resize" />
      <SidebarPanel />
    </Sidebar>,
  );

  const resize = screen.getByTestId('resize');

  expect(resize.id).toMatch(/:splitter:content:inspector$/);
  expect(resize).toHaveAttribute('data-side', 'right');
});

test('lets consumer click handlers cancel the default toggle', () => {
  render(
    <Sidebar>
      <SidebarPanel />
      <SidebarResizeTrigger />
      <SidebarTrigger onClick={(event) => event.preventDefault()} />
      <SidebarInset />
    </Sidebar>,
  );

  const trigger = screen.getByRole('button', { name: 'Toggle sidebar' });

  fireEvent.click(trigger);

  expect(trigger).toHaveAttribute('aria-expanded', 'true');
});

test('preserves active link composition for primary and nested navigation', () => {
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

  const overview = screen.getByRole('link', { name: 'Overview' });
  const details = screen.getByRole('link', { name: 'Details' });

  expect(overview).toHaveAttribute('aria-current', 'page');
  expect(overview).toHaveAttribute('data-slot', 'sidebar-navigation-button');
  expect(overview).toHaveAttribute('data-active');
  expect(overview).toHaveAttribute('data-size', 'sm');
  expect(details).toHaveAttribute('aria-current', 'page');
  expect(details).toHaveAttribute('data-slot', 'sidebar-navigation-sub-button');
  expect(details).toHaveAttribute('data-active');
  expect(screen.getByTestId('primary-badge')).toHaveAttribute(
    'data-slot',
    'sidebar-navigation-badge',
  );
  expect(screen.getByTestId('nested-badge')).toHaveTextContent('3');
  expect(screen.getByText('A very long nested navigation item')).toHaveAttribute(
    'data-slot',
    'sidebar-navigation-sub-label',
  );
});

test('preserves direct Select indicator composition in a navigation button', () => {
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

  const indicator = screen.getByTestId('select-indicator');

  expect(indicator).toBe(container.querySelector('[data-scope="select"][data-part="indicator"]'));
});

test('marks collapsed navigation content as hidden by default', () => {
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

  expect(screen.getByTestId('expanded-projects')).toHaveAttribute(
    'data-slot',
    'sidebar-expanded-content',
  );
  expect(screen.getByTestId('expanded-projects')).not.toHaveAttribute('hidden');
  expect(screen.getByTestId('collapsed-projects')).toHaveAttribute(
    'data-slot',
    'sidebar-collapsed-content',
  );
  expect(screen.getByTestId('collapsed-projects')).toHaveAttribute('hidden');
});

test('composes an explicit group header', () => {
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

  expect(screen.getByRole('list')).toHaveAttribute('data-slot', 'sidebar-navigation-list');
  expect(screen.getByRole('button', { name: 'Overview' })).toHaveAttribute(
    'data-slot',
    'sidebar-navigation-button',
  );
});

test('uses native Tailwind defaults and merges consumer utilities last', () => {
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
  const navigationButton = screen.getByRole('button', { name: 'Overview' });
  const trigger = screen.getByRole('button', { name: 'Toggle sidebar' });

  expect(root).toHaveClass('h-64', 'bg-muted');
  expect(root).not.toHaveClass('h-dvh', 'bg-background');
  expect(panel).toHaveClass('p-6', 'bg-card');
  expect(panel).not.toHaveClass('p-0');
  expect(navigationButton).toHaveClass('p-6', 'min-h-control-md');
  expect(navigationButton).not.toHaveClass('px-2', 'py-1');
  expect(trigger).toHaveClass('size-8');
  expect(trigger).not.toHaveClass('size-7');
  expect(trigger.querySelector('svg')).toBeVisible();
});