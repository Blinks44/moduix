import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  useNavigationMenu,
  useNavigationMenuContext,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuRootProvider,
  NavigationMenuItemIndicator,
  NavigationMenuIndicator,
  NavigationMenuArrow,
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

  return <output data-testid="navigation-menu-value">{navigationMenu().value ?? 'none'}</output>;
}

test('supports a controlled root provider and context', async () => {
  render(() => <ProviderNavigationMenu />);

  await expect.element(page.getByTestId('navigation-menu-value')).toContainText('products');
  await expect
    .element(page.getByRole('button', { name: 'Products', exact: true }))
    .toHaveAttribute('data-state', 'open');
  await expect
    .element(page.getByRole('navigation'))
    .toHaveAttribute('data-slot', 'navigation-menu-root-provider');
});

test('supports refs on regular parts and asChild composition', async () => {
  let root: HTMLElement | undefined;
  let trigger: HTMLElement | undefined;

  render(() => (
    <NavigationMenu ref={(element) => (root = element)}>
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger ref={(element) => (trigger = element)}>
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>Product links</NavigationMenuContent>
          <NavigationMenuLink asChild={(props) => <a {...props()} href="/docs" />} current>
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ));

  expect(root).toBeInstanceOf(HTMLElement);
  expect(root!.getAttribute('data-slot')).toBe('navigation-menu-root');
  expect(trigger).toBeInstanceOf(HTMLElement);
  expect(trigger!.getAttribute('data-slot')).toBe('navigation-menu-trigger');

  const linkLocator = page.getByRole('link', { name: 'Documentation', exact: true });
  await expect.element(linkLocator).toHaveAttribute('href', '/docs');
  await expect.element(linkLocator).toHaveAttribute('data-slot', 'navigation-menu-link');
  await expect.element(linkLocator).toHaveAttribute('data-current');
});

test('preserves Ark value changes, navigation semantics, and Tailwind anatomy', async () => {
  const changes: Array<string | null> = [];

  render(() => (
    <NavigationMenu
      defaultValue="products"
      onValueChange={(details) => changes.push(details.value)}
    >
      <NavigationMenuParts />
    </NavigationMenu>
  ));

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
  await page.getByRole('button', { name: 'Docs', exact: true }).click();
  await expect
    .element(page.getByRole('button', { name: 'Docs', exact: true }))
    .toHaveAttribute('data-state', 'closed');
  await expect
    .element(page.locator('[data-slot="navigation-menu-content"][data-value="docs"]'))
    .not.toBeVisible();
  expect(changes).toEqual(['docs', '']);
});

test('renders all parts and preserves Tailwind-owned styles', async () => {
  render(() => (
    <NavigationMenu defaultValue="products">
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>
            Products
            <svg aria-hidden="true" data-testid="trigger-icon" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
          </NavigationMenuContent>
          <NavigationMenuItemIndicator data-testid="item-indicator" />
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuIndicator data-testid="indicator" />
      <NavigationMenuArrow data-testid="arrow" />
      <NavigationMenuViewportPositioner>
        <NavigationMenuViewport data-testid="viewport" />
      </NavigationMenuViewportPositioner>
    </NavigationMenu>
  ));

  await expect.element(page.getByTestId('trigger-icon')).toBeAttached();
  await expect
    .element(page.getByRole('link', { name: 'Documentation', exact: true }))
    .toHaveAttribute('href', '/docs');
});

test('lets consumer utilities replace conflicting defaults', async () => {
  render(() => (
    <NavigationMenu class="w-1/2 text-primary">
      <NavigationMenuList class="gap-4 p-2">
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger class="min-h-0 rounded-lg px-6 text-lg">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent class="max-w-md py-0">Product links</NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ));

  const root = screen.getByRole('navigation');
  const list = root.querySelector('[data-slot="navigation-menu-list"]');
  const trigger = screen.getByRole('button', { name: 'Products' });
  const content = root.querySelector('[data-slot="navigation-menu-content"]');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-1/2', 'text-primary']));
  expect([...list!.classList]).toEqual(expect.arrayContaining(['gap-4', 'p-2']));
  expect([...trigger!.classList]).toEqual(
    expect.arrayContaining(['min-h-0', 'rounded-lg', 'px-6', 'text-lg']),
  );
  expect([...content!.classList]).toEqual(expect.arrayContaining(['max-w-md', 'py-0']));
  const triggerLocator = page.getByRole('button', { name: 'Products', exact: true });
  await expect.element(triggerLocator).toHaveCSS('min-height', '0px');
  await expect.element(triggerLocator).toHaveCSS('padding-left', '24px');
  await expect.element(triggerLocator).toHaveCSS('font-size', '18px');
  await expect.element(page.locator('[data-slot="navigation-menu-list"]')).toHaveCSS('gap', '16px');
});