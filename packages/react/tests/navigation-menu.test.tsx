import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import {
  NavigationMenu,
  useNavigationMenu,
  useNavigationMenuContext,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuRootProvider,
  NavigationMenuIndicator,
  NavigationMenuViewportPositioner,
  NavigationMenuViewport,
} from '../src';

function NavigationMenuParts() {
  return (
    <NavigationMenuList>
      <NavigationMenuItem value="home">
        <NavigationMenuLink current href="#home">
          Home
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem value="products">
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="#analytics">Analytics</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem value="docs">
        <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="#guides">Guides</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}

function ProviderNavigationMenu() {
  const navigationMenu = useNavigationMenu({ defaultValue: 'products' });

  return (
    <NavigationMenuRootProvider value={navigationMenu}>
      <NavigationMenuParts />
      <ContextValue />
    </NavigationMenuRootProvider>
  );
}

function ContextValue() {
  const navigationMenu = useNavigationMenuContext();
  return <output data-testid="navigation-menu-value">{navigationMenu.value ?? 'none'}</output>;
}

test('preserves Ark value changes and navigation semantics', async () => {
  const changes: Array<string | null> = [];
  render(
    <NavigationMenu
      defaultValue="products"
      onValueChange={(details) => changes.push(details.value)}
    >
      <NavigationMenuParts />
    </NavigationMenu>,
  );

  const products = screen.getByRole('button', { name: 'Products' });
  const docs = screen.getByRole('button', { name: 'Docs' });

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
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent data-testid="products-content">
            <div data-testid="content-heading">Products</div>
            <NavigationMenuLink href="#analytics">Analytics</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>,
  );

  const content = screen.getByTestId('products-content');

  expect(content.children).toHaveLength(2);
  expect(content.firstElementChild).toBe(screen.getByTestId('content-heading'));
});

test('keeps a shared indicator outside content and updates its state', async () => {
  const { container } = render(
    <NavigationMenu defaultValue="products">
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="#analytics">Analytics</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="docs">
          <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="#guides">Guides</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuIndicator />
      </NavigationMenuList>
    </NavigationMenu>,
  );

  const list = container.querySelector('[data-slot="navigation-menu-list"]');
  const indicator = container.querySelector('[data-slot="navigation-menu-indicator"]');

  expect(list?.lastElementChild).toBe(indicator);
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
      <NavigationMenuList>
        <NavigationMenuItem value="home">
          <NavigationMenuLink asChild current>
            <a data-testid="home-link" href="#home">
              Home
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger asChild>
            <button type="button">Products</button>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>,
  );

  expect(screen.getByTestId('home-link')).toHaveAttribute('data-current');
  expect(screen.getByTestId('home-link')).toHaveAttribute('data-slot', 'navigation-menu-link');
  expect(screen.getByRole('button', { name: 'Products' }).className).toBe('');
});

test('keeps viewport motion and provider composition Ark-shaped', async () => {
  const { container } = render(<ProviderNavigationMenu />);

  expect(screen.getByTestId('navigation-menu-value')).toHaveTextContent('products');
  expect(
    container.querySelector('[data-slot="navigation-menu-root-provider"]'),
  ).toBeInTheDocument();

  const { container: viewportContainer } = render(
    <NavigationMenu defaultValue="products">
      <NavigationMenuParts />
      <NavigationMenuViewportPositioner align="center">
        <NavigationMenuViewport />
      </NavigationMenuViewportPositioner>
    </NavigationMenu>,
  );

  expect(screen.getAllByRole('link', { name: 'Analytics' }).at(-1)).toBeVisible();
  expect(
    viewportContainer.querySelector('[data-slot="navigation-menu-viewport-positioner"]'),
  ).toBeInTheDocument();
  expect(viewportContainer.querySelector('[data-slot="navigation-menu-viewport"]')).toHaveAttribute(
    'data-state',
    'open',
  );

  fireEvent.click(within(viewportContainer).getByRole('button', { name: 'Docs' }));

  await waitFor(() =>
    expect(
      viewportContainer.querySelector(
        '[data-slot="navigation-menu-content"][data-motion="from-end"]',
      ),
    ).toBeInTheDocument(),
  );
});