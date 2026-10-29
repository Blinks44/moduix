import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuIndicator,
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

  await expect
    .element(page.getByRole('button', { name: 'Products', exact: true }))
    .toHaveAttribute('data-state', 'open');
  await expect.element(page.getByRole('link', { name: 'Analytics', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Docs', exact: true }).hover();

  await expect
    .element(page.getByRole('button', { name: 'Docs', exact: true }))
    .toHaveAttribute('data-state', 'open');
  expect(changes).toEqual(['docs']);
  await expect.element(page.getByRole('link', { name: 'Guides', exact: true })).toBeVisible();
  const sharedList = document.querySelector('[data-slot="navigation-menu-list"]');
  const indicator = document.querySelector('[data-slot="navigation-menu-indicator"]');
  expect(sharedList?.lastElementChild).toBe(indicator);
  expect(
    document.querySelector(
      '[data-slot="navigation-menu-content"] [data-slot="navigation-menu-indicator"]',
    ),
  ).toBeNull();
  await expect
    .element(page.locator('[data-slot="navigation-menu-indicator"]'))
    .toHaveAttribute('data-state', 'open');

  const productsContent = screen.getByTestId('products-content');
  expect(productsContent.children).toHaveLength(2);
  expect(productsContent.firstElementChild).toBe(screen.getByTestId('content-heading'));
  await page.getByRole('button', { name: 'Docs', exact: true }).click();
  await expect
    .element(page.getByRole('button', { name: 'Docs', exact: true }))
    .toHaveAttribute('data-state', 'closed');
  await expect
    .element(page.locator('[data-slot="navigation-menu-content"][data-value="docs"]'))
    .not.toBeVisible();
  expect(changes).toEqual(['docs', '']);
});

test('starts closed by default', async () => {
  render(
    <NavigationMenu>
      <NavigationMenuParts />
    </NavigationMenu>,
  );

  await expect
    .element(page.getByRole('button', { name: 'Products', exact: true }))
    .toHaveAttribute('data-state', 'closed');
  await expect
    .element(page.getByRole('button', { name: 'Docs', exact: true }))
    .toHaveAttribute('data-state', 'closed');
});

test('preserves asChild and current link styling hooks', async () => {
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

  await expect.element(page.getByTestId('home-link')).toHaveAttribute('data-current');
  await expect
    .element(page.getByTestId('home-link'))
    .toHaveAttribute('data-slot', 'navigation-menu-link');
});