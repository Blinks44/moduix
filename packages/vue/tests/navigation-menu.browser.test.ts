import { page } from '@rstest/browser';
import { beforeEach, expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, defineComponent, ref } from 'vue';
import {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuContent,
  NavigationMenuContext,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuItemIndicator,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRootProvider,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NavigationMenuViewportPositioner,
  useNavigationMenu,
  useNavigationMenuContext,
} from '../src';

const components = {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuContent,
  NavigationMenuContext,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuItemIndicator,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRootProvider,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NavigationMenuViewportPositioner,
};

const NavigationMenuParts = defineComponent({
  components,
  template: `
    <NavigationMenuList>
      <NavigationMenuItem value="home">
        <NavigationMenuLink current href="#home">Home</NavigationMenuLink>
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
    <NavigationMenuIndicator />
    </NavigationMenuList>
  `,
});

const ContextHookValue = defineComponent({
  setup() {
    return { navigationMenu: useNavigationMenuContext() };
  },
  template: '<output data-testid="hook-value">{{ navigationMenu.value || "none" }}</output>',
});

const ProviderNavigationMenu = defineComponent({
  components: { ...components, ContextHookValue, NavigationMenuParts },
  setup() {
    return { navigationMenu: useNavigationMenu({ defaultValue: 'products' }) };
  },
  template: `
    <NavigationMenuRootProvider :value="navigationMenu">
      <NavigationMenuParts />
      <NavigationMenuContext v-slot="context">
        <output data-testid="navigation-menu-value">{{ context.value || 'none' }}</output>
      </NavigationMenuContext>
      <ContextHookValue />
      <NavigationMenuViewportPositioner align="center"><NavigationMenuViewport /></NavigationMenuViewportPositioner>
    </NavigationMenuRootProvider>
  `,
});

beforeEach(async () => {
  const { unmount } = render({
    template:
      '<button style="position: fixed; right: 0; bottom: 0" type="button">Outside navigation</button>',
  });
  await page.getByRole('button', { name: 'Outside navigation', exact: true }).hover();
  unmount();
});

test('preserves Ark value changes and navigation semantics', async () => {
  const changes: Array<string | null> = [];

  render({
    components: { ...components, NavigationMenuParts },
    setup() {
      return {
        handleValueChange: (details: { value: string | null }) => changes.push(details.value),
      };
    },
    template: `
      <NavigationMenu default-value="products" @value-change="handleValueChange">
        <NavigationMenuParts />
      </NavigationMenu>
    `,
  });

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
  await page.getByRole('button', { name: 'Docs', exact: true }).click();
  await expect
    .element(page.getByRole('button', { name: 'Docs', exact: true }))
    .toHaveAttribute('data-state', 'closed');
  await expect
    .element(page.locator('[data-slot="navigation-menu-content"][data-value="docs"]'))
    .not.toBeVisible();
  expect(changes).toEqual(['docs', '']);
});

test('supports controlled v-model:value state', async () => {
  render({
    components: { ...components, NavigationMenuParts },
    setup() {
      return { value: ref<string | undefined>() };
    },
    template: `
      <NavigationMenu v-model:value="value">
        <NavigationMenuParts />
      </NavigationMenu>
      <output data-testid="controlled-value">{{ value || 'none' }}</output>
    `,
  });

  await page.getByRole('button', { name: 'Products', exact: true }).click();
  await expect.element(page.getByTestId('controlled-value')).toContainText('products');

  await page.getByRole('button', { name: 'Docs', exact: true }).press('Enter');
  await expect.element(page.getByTestId('controlled-value')).toContainText('docs');
});

test('starts closed by default', async () => {
  render({
    components: { ...components, NavigationMenuParts },
    template: '<NavigationMenu><NavigationMenuParts /></NavigationMenu>',
  });

  await expect
    .element(page.getByRole('button', { name: 'Products', exact: true }))
    .toHaveAttribute('data-state', 'closed');
  await expect
    .element(page.getByRole('button', { name: 'Docs', exact: true }))
    .toHaveAttribute('data-state', 'closed');
});

test('hydrates stable hosts and ids and opens content', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrNavigationMenu));
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="navigation-menu-root"]');
  const serverTrigger = host.querySelector('button');
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(SsrNavigationMenu);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelector('[data-slot="navigation-menu-root"]')).toBe(serverRoot);
    expect(host.querySelector('button')).toBe(serverTrigger);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await expect
      .element(page.getByRole('button', { name: 'Products', exact: true }))
      .toHaveAttribute('data-state', 'closed');
    await page.getByRole('button', { name: 'Products', exact: true }).click();
    await expect.element(page.getByRole('link', { name: 'Analytics', exact: true })).toBeVisible();
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});

test('renders every public part and preserves Content children without a wrapper', async () => {
  render({
    components,
    template: `
        <NavigationMenu default-value="products">
          <NavigationMenuList>
            <NavigationMenuItem value="products">
              <NavigationMenuTrigger>
                Products
                <svg aria-hidden="true" data-testid="trigger-icon" />
              </NavigationMenuTrigger>
              <NavigationMenuContent data-testid="products-content">
                <div data-testid="content-heading">Products</div>
                <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
              </NavigationMenuContent>
              <NavigationMenuItemIndicator data-testid="item-indicator" />
            </NavigationMenuItem>
            <NavigationMenuIndicator data-testid="indicator">
              <NavigationMenuArrow data-testid="arrow" />
            </NavigationMenuIndicator>
          </NavigationMenuList>
          <NavigationMenuViewportPositioner>
            <NavigationMenuViewport data-testid="viewport" />
          </NavigationMenuViewportPositioner>
        </NavigationMenu>
      `,
  });

  const productsContent = screen.getByTestId('products-content');
  expect(productsContent.children).toHaveLength(2);
  expect(productsContent.firstElementChild).toBe(screen.getByTestId('content-heading'));
  await expect.element(page.getByTestId('trigger-icon')).toBeAttached();
  await expect.element(page.getByTestId('item-indicator')).toBeAttached();
  await expect.element(page.getByTestId('indicator')).toBeAttached();
  await expect.element(page.getByTestId('arrow')).toBeAttached();
  await expect.element(page.getByTestId('viewport')).toBeAttached();
  await expect
    .element(page.getByRole('link', { name: 'Documentation', exact: true }))
    .toHaveAttribute('href', '/docs');
});

test('preserves asChild and current link styling hooks', async () => {
  render({
    components,
    template: `
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem value="home">
              <NavigationMenuLink as-child current>
                <a data-testid="home-link" href="#home">Home</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem value="products">
              <NavigationMenuTrigger as-child><button type="button">Products</button></NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      `,
  });

  await expect.element(page.getByTestId('home-link')).toHaveAttribute('data-current');
  await expect
    .element(page.getByTestId('home-link'))
    .toHaveAttribute('data-slot', 'navigation-menu-link');
  expect(screen.getByRole('button', { name: 'Products' }).className).toBe('');
});

test('supports refs on regular parts through $el', () => {
  const rootRef = ref();
  const triggerRef = ref();

  render({
    components,
    setup() {
      return { rootRef, triggerRef };
    },
    template: `
      <NavigationMenu ref="rootRef">
        <NavigationMenuList>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger ref="triggerRef">Products</NavigationMenuTrigger>
            <NavigationMenuContent>Product links</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    `,
  });

  expect(rootRef.value?.$el).toBe(screen.getByRole('navigation'));
  expect(triggerRef.value?.$el).toBe(screen.getByRole('button', { name: 'Products' }));
});

test('keeps viewport motion and provider composition Ark-shaped', async () => {
  render(ProviderNavigationMenu);

  await expect.element(page.getByTestId('navigation-menu-value')).toContainText('products');
  await expect.element(page.getByTestId('hook-value')).toContainText('products');
  await expect
    .element(page.getByRole('button', { name: 'Products', exact: true }))
    .toHaveAttribute('data-state', 'open');
  await expect
    .element(page.getByRole('navigation'))
    .toHaveAttribute('data-slot', 'navigation-menu-root-provider');

  await expect
    .element(page.locator('[data-slot="navigation-menu-viewport-positioner"]'))
    .toBeAttached();
  await expect
    .element(page.locator('[data-slot="navigation-menu-viewport"]'))
    .toHaveAttribute('data-state', 'open');

  await page.getByRole('button', { name: 'Docs', exact: true }).hover();

  await expect
    .element(page.locator('[data-slot="navigation-menu-content"][data-value="docs"][data-motion]'))
    .toBeAttached();
});
import SsrNavigationMenu from './fixtures/SsrNavigationMenu.vue';