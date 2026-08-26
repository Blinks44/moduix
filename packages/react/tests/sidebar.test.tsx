import { createListCollection } from '@ark-ui/react/collection';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { Select, Sidebar, useSplitterContext } from '../src';

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
      <Sidebar.Panel data-testid="panel">
        <DefaultSidebarConstraints />
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger data-testid="resize" />
      <Sidebar.Trigger />
      <Sidebar.Inset data-testid="inset">Content</Sidebar.Inset>
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
      <Sidebar.Inset />
      <Sidebar.Trigger />
      <Sidebar.ResizeTrigger data-testid="resize" />
      <Sidebar.Panel />
    </Sidebar>,
  );

  const resize = screen.getByTestId('resize');

  expect(resize.id).toMatch(/:splitter:content:inspector$/);
  expect(resize).toHaveAttribute('data-side', 'right');
});

test('lets consumer click handlers cancel the default toggle', () => {
  render(
    <Sidebar>
      <Sidebar.Panel />
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger onClick={(event) => event.preventDefault()} />
      <Sidebar.Inset />
    </Sidebar>,
  );

  const trigger = screen.getByRole('button', { name: 'Toggle sidebar' });

  fireEvent.click(trigger);

  expect(trigger).toHaveAttribute('aria-expanded', 'true');
});

test('preserves active link composition for primary and nested navigation', () => {
  render(
    <Sidebar>
      <Sidebar.Panel>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton asChild active size="sm">
              <a href="#overview">Overview</a>
            </Sidebar.MenuButton>
            <Sidebar.MenuSub>
              <Sidebar.MenuSubItem>
                <Sidebar.MenuSubButton asChild active>
                  <a href="#details">Details</a>
                </Sidebar.MenuSubButton>
              </Sidebar.MenuSubItem>
              <Sidebar.MenuSubItem>
                <Sidebar.MenuSubButton href="#very-long-item">
                  A very long nested navigation item
                </Sidebar.MenuSubButton>
              </Sidebar.MenuSubItem>
            </Sidebar.MenuSub>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset />
    </Sidebar>,
  );

  const overview = screen.getByRole('link', { name: 'Overview' });
  const details = screen.getByRole('link', { name: 'Details' });

  expect(overview).toHaveAttribute('aria-current', 'page');
  expect(overview).toHaveAttribute('data-slot', 'sidebar-menu-button');
  expect(overview).toHaveAttribute('data-active');
  expect(overview).toHaveAttribute('data-size', 'sm');
  expect(details).toHaveAttribute('aria-current', 'page');
  expect(details).toHaveAttribute('data-slot', 'sidebar-menu-sub-button');
  expect(details).toHaveAttribute('data-active');
  expect(screen.getByText('A very long nested navigation item')).toHaveAttribute(
    'data-slot',
    'sidebar-menu-sub-label',
  );
});

test('preserves wrapped Select indicator composition in a menu button', () => {
  const { container } = render(
    <Sidebar>
      <Sidebar.Panel>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Select collection={workspaces} defaultValue={['acme']}>
              <Select.Trigger asChild>
                <Sidebar.MenuButton aria-label="Select workspace">
                  <span data-sidebar-icon>AC</span>
                  <Sidebar.Label>
                    <Select.ValueText placeholder="Select workspace" />
                  </Sidebar.Label>
                  <Sidebar.Label data-testid="select-indicator">
                    <Select.Indicator />
                  </Sidebar.Label>
                </Sidebar.MenuButton>
              </Select.Trigger>
            </Select>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset />
    </Sidebar>,
  );

  const indicator = screen.getByTestId('select-indicator');

  expect(indicator).toContainElement(
    container.querySelector('[data-scope="select"][data-part="indicator"]'),
  );
});