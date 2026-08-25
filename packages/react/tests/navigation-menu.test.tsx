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

test('keeps content arrows outside the scrolling panel body', () => {
  const { container } = render(
    <NavigationMenu defaultValue="products">
      <NavigationMenu.List>
        <NavigationMenu.Item value="products">
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Indicator>
              <NavigationMenu.Arrow />
            </NavigationMenu.Indicator>
            <NavigationMenu.Link href="#analytics">Analytics</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>,
  );

  const content = container.querySelector('[data-slot="navigation-menu-content"]');
  const indicator = container.querySelector('[data-slot="navigation-menu-indicator"]');
  const link = screen.getByRole('link', { name: 'Analytics' });

  expect(content?.firstElementChild).toBe(indicator);
  expect(link.parentElement).toBe(content?.lastElementChild);
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
      <NavigationMenu.ViewportPositioner align="center">
        <NavigationMenu.Viewport />
      </NavigationMenu.ViewportPositioner>
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