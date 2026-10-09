import { page } from '@rstest/browser';
import { beforeEach, expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { ChevronDownIcon } from '@/internal/icons/ui/Icons';
import {
  NavigationMenu,
  useNavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuItemIndicator,
  NavigationMenuIndicator,
  NavigationMenuArrow,
  NavigationMenuViewportPositioner,
  NavigationMenuViewport,
  NavigationMenuRootProvider,
  NavigationMenuContext,
} from '../src';

beforeEach(async () => {
  const { unmount } = render(() => (
    <button type="button" style={{ position: 'fixed', right: '0', bottom: '0' }}>
      Outside navigation
    </button>
  ));
  await page.getByRole('button', { name: 'Outside navigation', exact: true }).hover();
  unmount();
});

test('renders all parts and preserves children', async () => {
  render(() => (
    <NavigationMenu defaultValue="products">
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>
            Products
            <ChevronDownIcon data-testid="trigger-icon" />
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

  await expect
    .element(page.getByRole('navigation'))
    .toHaveAttribute('data-slot', 'navigation-menu-root');
  await expect.element(page.getByTestId('viewport')).toHaveAttribute('data-state', 'open');
  await expect
    .element(page.getByRole('button', { name: /products/i, exact: true }))
    .toHaveAttribute('data-slot', 'navigation-menu-trigger');
  await expect.element(page.getByTestId('trigger-icon')).toBeAttached();
  await expect
    .element(page.getByTestId('item-indicator'))
    .toHaveAttribute('data-slot', 'navigation-menu-item-indicator');
  await expect
    .element(page.getByTestId('indicator'))
    .toHaveAttribute('data-slot', 'navigation-menu-indicator');
  await expect
    .element(page.getByTestId('arrow'))
    .toHaveAttribute('data-slot', 'navigation-menu-arrow');
  await expect
    .element(page.getByTestId('viewport'))
    .toHaveAttribute('data-slot', 'navigation-menu-viewport');
  await expect
    .element(page.getByRole('link', { name: 'Documentation', exact: true }))
    .toHaveAttribute('href', '/docs');
});

test('changes value and closes when the active trigger is clicked', async () => {
  const values: Array<string | null> = [];

  render(() => (
    <NavigationMenu onValueChange={(details) => values.push(details.value)}>
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>Product links</NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="company">
          <NavigationMenuTrigger>Company</NavigationMenuTrigger>
          <NavigationMenuContent>Company links</NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ));

  const productsTrigger = page.getByRole('button', { name: 'Products', exact: true });
  await productsTrigger.click();
  await expect.element(productsTrigger).toHaveAttribute('data-state', 'open');
  await expect.element(page.getByText('Product links')).toBeVisible();

  const companyTrigger = page.getByRole('button', { name: 'Company', exact: true });
  await companyTrigger.hover();
  await expect.element(companyTrigger).toHaveAttribute('data-state', 'open');
  await expect.element(productsTrigger).toHaveAttribute('data-state', 'closed');
  await expect.element(page.getByText('Company links')).toBeVisible();
  expect(values).toEqual(['products', 'company']);

  await companyTrigger.click();
  await expect.element(companyTrigger).toHaveAttribute('data-state', 'closed');
  await expect.element(page.getByText('Company links')).not.toBeVisible();
  expect(values).toEqual(['products', 'company', '']);
});

test('supports a controlled root provider and context', async () => {
  const ProviderState = () => {
    const navigationMenu = useNavigationMenu({ defaultValue: 'products' });

    return (
      <NavigationMenuRootProvider value={navigationMenu}>
        <NavigationMenuContext>
          {(context) => <div data-testid="context-value">{context().value || 'none'}</div>}
        </NavigationMenuContext>
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>Product links</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenuRootProvider>
    );
  };

  render(() => <ProviderState />);

  await expect.element(page.getByTestId('context-value')).toContainText('products');
  await expect
    .element(page.getByRole('button', { name: 'Products', exact: true }))
    .toHaveAttribute('data-state', 'open');
  await expect
    .element(page.getByRole('navigation'))
    .toHaveAttribute('data-slot', 'navigation-menu-root-provider');
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

  const documentationLocator = page.getByRole('link', { name: 'Documentation', exact: true });
  await expect.element(documentationLocator).toHaveAttribute('href', '/docs');
  await expect.element(documentationLocator).toHaveAttribute('data-slot', 'navigation-menu-link');
  await expect.element(documentationLocator).toHaveAttribute('data-current');
  await expect.element(documentationLocator).toHaveCSS('display', 'inline-flex');
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

test('supports viewport motion after opening content', async () => {
  render(() => (
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
});