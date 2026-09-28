import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
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
    </NavigationMenuRootProvider>
  `,
});

test('preserves Ark value changes and navigation semantics', async () => {
  const changes: Array<string | null> = [];
  const App = defineComponent({
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

  render(App);

  const products = screen.getByRole('button', { name: 'Products' });
  const docs = screen.getByRole('button', { name: 'Docs' });

  expect(products).toHaveAttribute('data-state', 'open');
  expect(screen.getByRole('link', { name: 'Analytics' })).toBeVisible();

  await fireEvent.click(docs);

  await waitFor(() => expect(docs).toHaveAttribute('data-state', 'open'));
  expect(changes).toEqual(['docs']);
  expect(screen.getByRole('link', { name: 'Guides' })).toBeVisible();
});

test('supports controlled v-model:value state', async () => {
  const App = defineComponent({
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

  render(App);

  await fireEvent.click(screen.getByRole('button', { name: 'Products' }));
  await waitFor(() => expect(screen.getByTestId('controlled-value')).toHaveTextContent('products'));

  await fireEvent.click(screen.getByRole('button', { name: 'Docs' }));
  await waitFor(() => expect(screen.getByTestId('controlled-value')).toHaveTextContent('docs'));
});

test('starts closed by default', () => {
  render(
    defineComponent({
      components: { ...components, NavigationMenuParts },
      template: '<NavigationMenu><NavigationMenuParts /></NavigationMenu>',
    }),
  );

  expect(screen.getByRole('button', { name: 'Products' })).toHaveAttribute('data-state', 'closed');
  expect(screen.getByRole('button', { name: 'Docs' })).toHaveAttribute('data-state', 'closed');
});

test('renders safely on the server and hydrates stable ids', async () => {
  const App = defineComponent({
    components: { ...components, NavigationMenuParts },
    template: '<NavigationMenu><NavigationMenuParts /></NavigationMenu>',
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="navigation-menu-content"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);

  const app = createSSRApp(App);
  app.mount(host);

  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  app.unmount();
  host.remove();
});

test('renders every public part and preserves Content children without a wrapper', () => {
  render(
    defineComponent({
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
    }),
  );

  const content = screen.getByTestId('products-content');
  expect(content.children).toHaveLength(2);
  expect(content.firstElementChild).toBe(screen.getByTestId('content-heading'));
  expect(screen.getByTestId('trigger-icon')).toBeInTheDocument();
  expect(screen.getByTestId('item-indicator')).toBeInTheDocument();
  expect(screen.getByTestId('indicator')).toBeInTheDocument();
  expect(screen.getByTestId('arrow')).toBeInTheDocument();
  expect(screen.getByTestId('viewport')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Documentation' })).toHaveAttribute('href', '/docs');
});

test('keeps a shared indicator outside content and updates its state', async () => {
  const { container } = render(
    defineComponent({
      components,
      template: `
        <NavigationMenu default-value="products">
          <NavigationMenuList>
            <NavigationMenuItem value="products">
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent><NavigationMenuLink href="#analytics">Analytics</NavigationMenuLink></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem value="docs">
              <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
              <NavigationMenuContent><NavigationMenuLink href="#guides">Guides</NavigationMenuLink></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuIndicator />
          </NavigationMenuList>
        </NavigationMenu>
      `,
    }),
  );

  const list = container.querySelector('[data-slot="navigation-menu-list"]');
  const indicator = container.querySelector('[data-slot="navigation-menu-indicator"]');

  expect(list?.lastElementChild).toBe(indicator);
  expect(
    container.querySelector(
      '[data-slot="navigation-menu-content"] [data-slot="navigation-menu-indicator"]',
    ),
  ).toBeNull();

  await fireEvent.click(within(container as HTMLElement).getByRole('button', { name: 'Docs' }));
  await waitFor(() => expect(indicator).toHaveAttribute('data-state', 'open'));
});

test('preserves asChild and current link styling hooks', () => {
  render(
    defineComponent({
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
    }),
  );

  expect(screen.getByTestId('home-link')).toHaveAttribute('data-current');
  expect(screen.getByTestId('home-link')).toHaveAttribute('data-slot', 'navigation-menu-link');
  expect(screen.getByRole('button', { name: 'Products' }).className).toBe('');
});

test('supports refs on regular parts through $el', () => {
  const rootRef = ref();
  const triggerRef = ref();
  const App = defineComponent({
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

  render(App);

  expect(rootRef.value?.$el).toBe(screen.getByRole('navigation'));
  expect(triggerRef.value?.$el).toBe(screen.getByRole('button', { name: 'Products' }));
});

test('keeps viewport motion and provider composition Ark-shaped', async () => {
  render(ProviderNavigationMenu);

  expect(screen.getByTestId('navigation-menu-value')).toHaveTextContent('products');
  expect(screen.getByTestId('hook-value')).toHaveTextContent('products');
  expect(screen.getByRole('button', { name: 'Products' })).toHaveAttribute('data-state', 'open');
  expect(screen.getByRole('navigation')).toHaveAttribute(
    'data-slot',
    'navigation-menu-root-provider',
  );

  const viewportApp = defineComponent({
    components: { ...components, NavigationMenuParts },
    template: `
      <NavigationMenu default-value="products">
        <NavigationMenuParts />
        <NavigationMenuViewportPositioner align="center">
          <NavigationMenuViewport />
        </NavigationMenuViewportPositioner>
      </NavigationMenu>
    `,
  });
  const { container } = render(viewportApp);

  expect(
    container.querySelector('[data-slot="navigation-menu-viewport-positioner"]'),
  ).toBeInTheDocument();
  expect(container.querySelector('[data-slot="navigation-menu-viewport"]')).toHaveAttribute(
    'data-state',
    'open',
  );

  await fireEvent.click(within(container as HTMLElement).getByRole('button', { name: 'Docs' }));

  await waitFor(() =>
    expect(
      document.body.querySelector(
        '[data-slot="navigation-menu-content"][data-value="docs"][data-motion]',
      ),
    ).toBeInTheDocument(),
  );
});