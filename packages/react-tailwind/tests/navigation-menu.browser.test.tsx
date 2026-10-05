import { page } from '@rstest/browser';
import { beforeEach, expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
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
  NavigationMenuItemIndicator,
  NavigationMenuIndicator,
  NavigationMenuArrow,
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

beforeEach(async () => {
  const { unmount } = render(
    <button type="button" style={{ position: 'fixed', right: 0, bottom: 0 }}>
      Outside navigation
    </button>,
  );
  await page.getByRole('button', { name: 'Outside navigation', exact: true }).hover();
  unmount();
});

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

  const content = root.querySelector('[data-slot="navigation-menu-content"]');

  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['relative', 'flex', 'w-fit', 'text-foreground']),
  );
  expect([...list!.classList]).toEqual(
    expect.arrayContaining(['relative', 'flex', 'items-center', 'gap-1', 'p-0']),
  );
  expect([...products!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'min-h-control-md', 'rounded-md', 'px-3', 'text-sm']),
  );
  expect([...content!.classList]).toEqual(
    expect.arrayContaining(['absolute', 'w-max', 'rounded-md', 'bg-popover', 'py-1']),
  );
  expect([...screen.getByRole('link', { name: 'Analytics' })!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'min-h-control-md', 'text-sm']),
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

test('renders all parts and preserves Tailwind-owned styles', async () => {
  render(
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
    </NavigationMenu>,
  );

  await expect.element(page.getByTestId('trigger-icon')).toBeAttached();
  expect([...screen.getByRole('button', { name: 'Products' })!.classList]).toEqual(
    expect.arrayContaining(['[&>svg]:transition-[rotate]', 'data-[state=open]:[&>svg]:rotate-180']),
  );
  expect([...screen.getByTestId('item-indicator')!.classList]).toEqual(
    expect.arrayContaining(['absolute', 'h-0.5', 'bg-current']),
  );
  expect([...screen.getByTestId('indicator')!.classList]).toEqual(
    expect.arrayContaining(['absolute', 'h-2.5']),
  );
  expect([...screen.getByTestId('arrow')!.classList]).toEqual(
    expect.arrayContaining(['size-2.5', 'rotate-45', 'bg-popover']),
  );
  expect([...screen.getByTestId('viewport')!.classList]).toEqual(
    expect.arrayContaining(['relative', 'overflow-hidden', 'bg-popover']),
  );
  await expect
    .element(page.getByRole('link', { name: 'Documentation', exact: true }))
    .toHaveAttribute('href', '/docs');
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
  expect(screen.getByRole('button', { name: 'Products' }).className).toBe('');
});

test('lets consumer utilities replace conflicting defaults', async () => {
  render(
    <NavigationMenu className="w-1/2 text-primary">
      <NavigationMenuList className="gap-4 p-2">
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger className="min-h-0 rounded-lg px-6 text-lg">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent className="max-w-md py-0">Product links</NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>,
  );

  const root = screen.getByRole('navigation');
  const list = root.querySelector('[data-slot="navigation-menu-list"]');
  const trigger = screen.getByRole('button', { name: 'Products' });
  const content = root.querySelector('[data-slot="navigation-menu-content"]');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-1/2', 'text-primary']));
  expect(['w-fit', 'text-foreground'].some((name) => root!.classList.contains(name))).toBe(false);
  expect([...list!.classList]).toEqual(expect.arrayContaining(['gap-4', 'p-2']));
  expect(['gap-1', 'p-0'].some((name) => list!.classList.contains(name))).toBe(false);
  expect([...trigger!.classList]).toEqual(
    expect.arrayContaining(['min-h-0', 'rounded-lg', 'px-6', 'text-lg']),
  );
  expect(
    ['min-h-control-md', 'rounded-md', 'px-3', 'text-sm'].some((name) =>
      trigger!.classList.contains(name),
    ),
  ).toBe(false);
  expect([...content!.classList]).toEqual(expect.arrayContaining(['max-w-md', 'py-0']));
  expect(
    ['max-w-[min(20rem,calc(100vw-1.5rem))]', 'py-1'].some((name) =>
      content!.classList.contains(name),
    ),
  ).toBe(false);
  const triggerLocator = page.getByRole('button', { name: 'Products', exact: true });
  await expect.element(triggerLocator).toHaveCSS('min-height', '0px');
  await expect.element(triggerLocator).toHaveCSS('padding-left', '24px');
  await expect.element(triggerLocator).toHaveCSS('font-size', '18px');
  await expect.element(page.locator('[data-slot="navigation-menu-list"]')).toHaveCSS('gap', '16px');
});

test('keeps viewport motion and provider composition Ark-shaped', async () => {
  const { container } = render(<ProviderNavigationMenu />);

  await expect.element(page.getByTestId('navigation-menu-value')).toContainText('products');
  await expect
    .element(page.getByRole('navigation'))
    .toHaveAttribute('data-slot', 'navigation-menu-root-provider');

  const viewport = container.querySelector('[data-slot="navigation-menu-viewport"]');
  expect([...viewport!.classList]).toEqual(
    expect.arrayContaining([
      'relative',
      'h-[var(--viewport-height)]',
      'w-[var(--viewport-width)]',
      'overflow-hidden',
    ]),
  );
  await expect.element(page.getByRole('link', { name: 'Analytics', exact: true })).toBeVisible();
  await expect
    .element(page.locator('[data-slot="navigation-menu-viewport-positioner"]'))
    .toBeAttached();
  await expect
    .element(page.locator('[data-slot="navigation-menu-viewport"]'))
    .toHaveAttribute('data-state', 'open');

  await page.getByRole('button', { name: 'Docs', exact: true }).hover();

  await expect
    .element(page.locator('[data-slot="navigation-menu-content"][data-motion="from-end"]'))
    .toBeAttached();
  expect(viewport?.className).toContain(
    '[&_[data-slot=navigation-menu-content][data-motion=from-end][data-state=open]]:animate-moduix-navigation-menu-content-from-end',
  );
  expect(viewport?.className).toContain(
    '[&_[data-slot=navigation-menu-content][data-motion=to-start][data-state=closed]]:animate-moduix-navigation-menu-content-to-start',
  );
  expect(viewport?.className).not.toContain(
    '[&_[data-slot=navigation-menu-content][data-motion=from-end]]:opacity-0',
  );
});