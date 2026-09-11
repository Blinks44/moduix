import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { NavigationMenu, useNavigationMenu, useNavigationMenuContext } from '../src';

function NavigationMenuParts() {
  return (
    <NavigationMenu.List>
      <NavigationMenu.Item value="home">
        <NavigationMenu.Link current href="#home">
          Home
        </NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="products">
        <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <NavigationMenu.Link href="#analytics">Analytics</NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="docs">
        <NavigationMenu.Trigger>Docs</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <NavigationMenu.Link href="#guides">Guides</NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  );
}

function ProviderNavigationMenu() {
  const navigationMenu = useNavigationMenu({ defaultValue: 'products' });

  return (
    <NavigationMenu.RootProvider value={navigationMenu}>
      <NavigationMenuParts />
      <ContextValue />
    </NavigationMenu.RootProvider>
  );
}

function ContextValue() {
  const navigationMenu = useNavigationMenuContext();

  return <output data-testid="navigation-menu-value">{navigationMenu.value ?? 'none'}</output>;
}

test('preserves Ark value changes, navigation semantics, and Tailwind anatomy', async () => {
  const changes: Array<string | null> = [];
  render(
    <NavigationMenu
      defaultValue="products"
      onValueChange={(details) => changes.push(details.value)}
    >
      <NavigationMenuParts />
    </NavigationMenu>,
  );

  const root = screen.getByRole('navigation');
  const list = root.querySelector('[data-slot="navigation-menu-list"]');
  const products = screen.getByRole('button', { name: 'Products' });
  const docs = screen.getByRole('button', { name: 'Docs' });
  const content = root.querySelector('[data-slot="navigation-menu-content"]');

  expect(root).toHaveClass('relative', 'flex', 'w-fit', 'text-foreground');
  expect(list).toHaveClass('relative', 'flex', 'items-center', 'gap-1', 'p-0');
  expect(products).toHaveClass('inline-flex', 'min-h-control-md', 'rounded-md', 'px-3', 'text-sm');
  expect(content).toHaveClass('absolute', 'w-max', 'rounded-md', 'bg-popover', 'py-1');
  expect(screen.getByRole('link', { name: 'Analytics' })).toHaveClass(
    'inline-flex',
    'min-h-control-md',
    'text-sm',
  );
  expect(products).toHaveAttribute('data-state', 'open');
  expect(screen.getByRole('link', { name: 'Analytics' })).toBeVisible();

  fireEvent.click(docs);

  await waitFor(() => expect(docs).toHaveAttribute('data-state', 'open'));
  expect(changes).toEqual(['docs']);
  expect(screen.getByRole('link', { name: 'Guides' })).toBeVisible();
});

test('starts closed by default', () => {
  render(
    <NavigationMenu>
      <NavigationMenuParts />
    </NavigationMenu>,
  );

  expect(screen.getByRole('button', { name: 'Products' })).toHaveAttribute('data-state', 'closed');
  expect(screen.getByRole('button', { name: 'Docs' })).toHaveAttribute('data-state', 'closed');
});

test('renders all parts and preserves Tailwind-owned styles', () => {
  render(
    <NavigationMenu defaultValue="products">
      <NavigationMenu.List>
        <NavigationMenu.Item value="products">
          <NavigationMenu.Trigger>
            Products
            <svg aria-hidden="true" data-testid="trigger-icon" />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link href="/docs">Documentation</NavigationMenu.Link>
          </NavigationMenu.Content>
          <NavigationMenu.ItemIndicator data-testid="item-indicator" />
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Indicator data-testid="indicator" />
      <NavigationMenu.Arrow data-testid="arrow" />
      <NavigationMenu.ViewportPositioner>
        <NavigationMenu.Viewport data-testid="viewport" />
      </NavigationMenu.ViewportPositioner>
    </NavigationMenu>,
  );

  expect(screen.getByTestId('trigger-icon')).toBeInTheDocument();
  expect(screen.getByTestId('item-indicator')).toHaveClass('absolute', 'h-0.5', 'bg-current');
  expect(screen.getByTestId('indicator')).toHaveClass('absolute', 'h-2.5');
  expect(screen.getByTestId('arrow')).toHaveClass('size-2.5', 'rotate-45', 'bg-popover');
  expect(screen.getByTestId('viewport')).toHaveClass('relative', 'overflow-hidden', 'bg-popover');
  expect(screen.getByRole('link', { name: 'Documentation' })).toHaveAttribute('href', '/docs');
});

test('renders safely on the server', () => {
  const html = renderToString(
    <NavigationMenu>
      <NavigationMenuParts />
    </NavigationMenu>,
  );

  expect(html).toContain('data-slot="navigation-menu-content"');
});

test('preserves Content children without an internal wrapper', () => {
  render(
    <NavigationMenu defaultValue="products">
      <NavigationMenu.List>
        <NavigationMenu.Item value="products">
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content data-testid="products-content">
            <div data-testid="content-heading">Products</div>
            <NavigationMenu.Link href="#analytics">Analytics</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>,
  );

  const content = screen.getByTestId('products-content');

  expect(content.children).toHaveLength(2);
  expect(content.firstElementChild).toBe(screen.getByTestId('content-heading'));
});

test('keeps a shared indicator outside content and updates its state', async () => {
  const { container } = render(
    <NavigationMenu defaultValue="products">
      <NavigationMenu.List>
        <NavigationMenu.Item value="products">
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link href="#analytics">Analytics</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="docs">
          <NavigationMenu.Trigger>Docs</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link href="#guides">Guides</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Indicator />
      </NavigationMenu.List>
    </NavigationMenu>,
  );

  const list = container.querySelector('[data-slot="navigation-menu-list"]');
  const indicator = container.querySelector('[data-slot="navigation-menu-indicator"]');

  expect(list?.lastElementChild).toBe(indicator);
  expect(indicator).toHaveClass(
    'absolute',
    'h-2.5',
    'w-[var(--trigger-width,0px)]',
    '[translate:var(--trigger-x,0px)_0]',
  );
  expect(
    container.querySelector(
      '[data-slot="navigation-menu-content"] [data-slot="navigation-menu-indicator"]',
    ),
  ).toBeNull();

  fireEvent.click(screen.getByRole('button', { name: 'Docs' }));

  await waitFor(() => expect(indicator).toHaveAttribute('data-state', 'open'));
});

test('preserves asChild and current link styling hooks', () => {
  render(
    <NavigationMenu>
      <NavigationMenu.List>
        <NavigationMenu.Item value="home">
          <NavigationMenu.Link asChild current>
            <a data-testid="home-link" href="#home">
              Home
            </a>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="products">
          <NavigationMenu.Trigger asChild>
            <button type="button">Products</button>
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>,
  );

  expect(screen.getByTestId('home-link')).toHaveAttribute('data-current');
  expect(screen.getByTestId('home-link')).toHaveAttribute('data-slot', 'navigation-menu-link');
  expect(screen.getByRole('button', { name: 'Products' }).className).toBe('');
});

test('lets consumer utilities replace conflicting defaults', () => {
  render(
    <NavigationMenu className="w-1/2 text-primary">
      <NavigationMenu.List className="gap-4 p-2">
        <NavigationMenu.Item value="products">
          <NavigationMenu.Trigger className="min-h-0 rounded-lg px-6 text-lg">
            Products
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="max-w-md py-0">Product links</NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>,
  );

  const root = screen.getByRole('navigation');
  const list = root.querySelector('[data-slot="navigation-menu-list"]');
  const trigger = screen.getByRole('button', { name: 'Products' });
  const content = root.querySelector('[data-slot="navigation-menu-content"]');

  expect(root).toHaveClass('w-1/2', 'text-primary');
  expect(root).not.toHaveClass('w-fit', 'text-foreground');
  expect(list).toHaveClass('gap-4', 'p-2');
  expect(list).not.toHaveClass('gap-1', 'p-0');
  expect(trigger).toHaveClass('min-h-0', 'rounded-lg', 'px-6', 'text-lg');
  expect(trigger).not.toHaveClass('min-h-control-md', 'rounded-md', 'px-3', 'text-sm');
  expect(content).toHaveClass('max-w-md', 'py-0');
  expect(content).not.toHaveClass('max-w-[min(20rem,calc(100vw-1.5rem))]', 'py-1');
});

test('keeps viewport motion and provider composition Ark-shaped', async () => {
  render(<ProviderNavigationMenu />);

  expect(screen.getByTestId('navigation-menu-value')).toHaveTextContent('products');
  expect(screen.getByRole('navigation')).toHaveAttribute(
    'data-slot',
    'navigation-menu-root-provider',
  );

  const { container: viewportContainer } = render(
    <NavigationMenu defaultValue="products">
      <NavigationMenuParts />
      <NavigationMenu.ViewportPositioner align="center">
        <NavigationMenu.Viewport />
      </NavigationMenu.ViewportPositioner>
    </NavigationMenu>,
  );

  const viewport = viewportContainer.querySelector('[data-slot="navigation-menu-viewport"]');
  expect(viewport).toHaveClass(
    'relative',
    'h-[var(--viewport-height)]',
    'w-[var(--viewport-width)]',
    'overflow-hidden',
  );
  expect(screen.getAllByRole('link', { name: 'Analytics' }).at(-1)).toBeVisible();
  expect(
    viewportContainer.querySelector('[data-slot="navigation-menu-viewport-positioner"]'),
  ).toBeInTheDocument();
  expect(viewport).toHaveAttribute('data-state', 'open');

  fireEvent.click(within(viewportContainer).getByRole('button', { name: 'Docs' }));

  await waitFor(() =>
    expect(
      viewportContainer.querySelector(
        '[data-slot="navigation-menu-content"][data-motion="from-end"]',
      ),
    ).toBeInTheDocument(),
  );
});