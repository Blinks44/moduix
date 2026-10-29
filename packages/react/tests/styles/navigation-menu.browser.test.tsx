import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import {
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
} from '@/index';

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
        <NavigationMenuContent data-testid="products-content">
          <div data-testid="content-heading">Products</div>
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
  );
}

function ProviderNavigationMenu() {
  const navigationMenu = useNavigationMenu({ defaultValue: 'products' });

  return (
    <NavigationMenuRootProvider value={navigationMenu}>
      <NavigationMenuParts />
      <ContextValue />
      <NavigationMenuViewportPositioner align="center">
        <NavigationMenuViewport />
      </NavigationMenuViewportPositioner>
    </NavigationMenuRootProvider>
  );
}

function ContextValue() {
  const navigationMenu = useNavigationMenuContext();
  return <output data-testid="navigation-menu-value">{navigationMenu.value ?? 'none'}</output>;
}

test('keeps viewport motion and provider composition Ark-shaped', async () => {
  render(<ProviderNavigationMenu />);

  await expect.element(page.getByTestId('navigation-menu-value')).toContainText('products');
  await expect.element(page.locator('[data-slot="navigation-menu-root-provider"]')).toBeAttached();

  await expect.element(page.getByRole('link', { name: 'Analytics', exact: true })).toBeVisible();
  await expect
    .element(page.locator('[data-slot="navigation-menu-viewport-positioner"]'))
    .toBeAttached();
  await expect
    .element(page.locator('[data-slot="navigation-menu-viewport"]'))
    .toHaveAttribute('data-state', 'open');

  await page.getByRole('button', { name: 'Docs', exact: true }).hover();

  await expect
    .element(page.locator('[data-slot="navigation-menu-content"][data-value="docs"]'))
    .toHaveAttribute('data-motion', 'from-end');

  await page.getByRole('button', { name: 'Products', exact: true }).hover();
  await expect
    .element(page.locator('[data-slot="navigation-menu-content"][data-value="products"]'))
    .toHaveAttribute('data-motion', 'from-start');
});