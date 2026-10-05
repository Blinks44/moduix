import { page } from '@rstest/browser';
import { beforeEach, expect, test } from '@rstest/core';
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

  return <output data-testid="navigation-menu-value">{navigationMenu().value ?? 'none'}</output>;
}

beforeEach(async () => {
  const { unmount } = render(() => (
    <button type="button" style={{ position: 'fixed', right: '0', bottom: '0' }}>
      Outside navigation
    </button>
  ));
  await page.getByRole('button', { name: 'Outside navigation', exact: true }).hover();
  unmount();
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
  render(() => (
    <NavigationMenu>
      <NavigationMenuParts />
    </NavigationMenu>
  ));

  await expect
    .element(page.getByRole('button', { name: 'Products', exact: true }))
    .toHaveAttribute('data-state', 'closed');
  await expect
    .element(page.getByRole('button', { name: 'Docs', exact: true }))
    .toHaveAttribute('data-state', 'closed');
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

test('renders closed content safely by default', async () => {
  render(() => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>Product links</NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ));

  await expect.element(page.locator('[data-slot="navigation-menu-content"]')).toBeAttached();
  await expect
    .element(page.locator('[data-slot="navigation-menu-content"]'))
    .toHaveAttribute('data-state', 'closed');
  await expect
    .element(page.locator('[data-slot="navigation-menu-content"]'))
    .toContainText('Product links');
  await expect.element(page.locator('[data-slot="navigation-menu-content"]')).not.toBeVisible();
});

test('preserves Content children without an internal wrapper', async () => {
  const { container } = render(() => (
    <NavigationMenu defaultValue="products">
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div data-testid="content-heading">Products</div>
            <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ));

  const content = container.querySelector<HTMLElement>('[data-slot="navigation-menu-content"]');
  await expect.element(page.locator('[data-slot="navigation-menu-content"]')).toBeAttached();
  expect(content?.children).toHaveLength(2);
  expect(content?.firstElementChild).toBe(screen.getByTestId('content-heading'));
  expect(content?.querySelector('[data-slot="navigation-menu-indicator"]')).toBeNull();
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

  const link = screen.getByRole('link', { name: 'Documentation' });
  const linkLocator = page.getByRole('link', { name: 'Documentation', exact: true });
  await expect.element(linkLocator).toHaveAttribute('href', '/docs');
  await expect.element(linkLocator).toHaveAttribute('data-slot', 'navigation-menu-link');
  await expect.element(linkLocator).toHaveAttribute('data-current');
  expect([...link!.classList]).toEqual(expect.arrayContaining(['inline-flex', 'min-h-control-md']));
});

test('does not forward refs through asChild composition', async () => {
  let linkRef: HTMLElement | undefined;

  render(() => (
    <NavigationMenu defaultValue="products">
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink
              ref={(element) => (linkRef = element)}
              asChild={(props) => <a {...props()} href="/docs" />}
            >
              Documentation
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ));

  expect(linkRef).toBeUndefined();
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

test('supports viewport motion after opening content', async () => {
  const { container } = render(() => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>Product links</NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="docs">
          <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
          <NavigationMenuContent>Documentation</NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewportPositioner>
        <NavigationMenuViewport />
      </NavigationMenuViewportPositioner>
    </NavigationMenu>
  ));

  const viewport = container.querySelector('[data-slot="navigation-menu-viewport"]');
  expect([...viewport!.classList]).toEqual(
    expect.arrayContaining([
      'relative',
      'h-[var(--viewport-height)]',
      'w-[var(--viewport-width)]',
      'overflow-hidden',
    ]),
  );
  await expect
    .element(page.locator('[data-slot="navigation-menu-viewport"]'))
    .toHaveAttribute('data-state', 'closed');

  await page.getByRole('button', { name: 'Products', exact: true }).click();

  await expect
    .element(page.locator('[data-slot="navigation-menu-viewport"]'))
    .toHaveAttribute('data-state', 'open');

  await page.getByRole('button', { name: 'Docs', exact: true }).hover();

  await expect
    .element(page.locator('[data-slot="navigation-menu-content"][data-value="docs"][data-motion]'))
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