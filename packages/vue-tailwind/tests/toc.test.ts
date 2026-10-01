import { TocNav as ArkTocNav, TocRoot as ArkTocRoot } from '@ark-ui/vue/toc';
import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { computed, createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Toc,
  TocContent,
  TocContext,
  TocIndicator,
  TocItem,
  TocLink,
  TocList,
  TocNav,
  TocRail,
  TocRootProvider,
  TocTitle,
  useToc,
} from '../src';

const tocComponents = {
  Toc,
  TocContent,
  TocContext,
  TocIndicator,
  TocItem,
  TocLink,
  TocList,
  TocNav,
  TocRail,
  TocRootProvider,
  TocTitle,
};

const items = [
  { value: 'introduction', depth: 2 },
  { value: 'configuration', depth: 3 },
];

test('sizes the rail in CSS pixels and reacts to depth changes', async () => {
  const depth = ref(3);
  const railRef = ref<ComponentPublicInstance>();
  renderToc('<TocRail ref="railRef" :depth="depth" :previous-depth="2" :next-depth="2" />', () => ({
    depth,
    railRef,
  }));
  const rail = railRef.value?.$el as SVGSVGElement;
  expect(rail.style.width).toBe('14px');
  expect(rail.querySelector('path')).toHaveAttribute('d', 'M 0.5 0 C 0.5 8 12.5 4 12.5 12');
  depth.value = 4;
  await nextTick();
  expect(rail.style.width).toBe('26px');
  expect(rail.querySelector('line')).toHaveAttribute('x1', '24.5');
});

test.each([
  { style: 'width: 40px; height: 80px; color: red' },
  { style: { width: '40px', height: '80px', color: 'red' } },
  { style: [{ width: '40px' }, 'height: 80px; color: red'] },
])('preserves consumer rail style overrides: %j', ({ style }) => {
  const { container } = render(TocRail, { props: { depth: 3, style } });
  const rail = container.querySelector('svg')!;
  expect(rail.style.width).toBe('40px');
  expect(rail.style.height).toBe('80px');
  expect(rail.style.color).toBe('red');
});

test('preserves reactive hook props and its native emit callback', async () => {
  const activeIds = ref<string[]>();
  const onActiveChange = rs.fn();
  const emit = rs.fn();
  renderToc(
    `
    <button @click="toc.setActiveIds(['configuration'])">Activate configuration</button>
    <TocRootProvider :value="toc">
      <TocContext v-slot="context"><output role="status">{{ context.activeIds.join(', ') }}</output></TocContext>
    </TocRootProvider>
  `,
    () => ({
      toc: useToc(
        computed(() => ({
          items,
          activeIds: activeIds.value,
          defaultActiveIds: ['introduction'],
          onActiveChange,
        })),
        emit,
      ),
    }),
  );
  expect(screen.getByRole('status')).toHaveTextContent('introduction');
  await fireEvent.click(screen.getByRole('button', { name: 'Activate configuration' }));
  await waitFor(() => expect(emit).toHaveBeenCalledTimes(1));
  expect(emit).toHaveBeenCalledWith(
    'activeChange',
    expect.objectContaining({
      activeIds: ['configuration'],
    }),
  );
  expect(onActiveChange).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('status')).toHaveTextContent('configuration');
  activeIds.value = ['introduction'];
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('introduction'));
});

const renderToc = (template: string, setup?: () => Record<string, unknown>) =>
  render(
    defineComponent({
      components: tocComponents,
      setup() {
        return { ...setup?.() };
      },
      template,
    }),
  );

test('preserves Ark navigation semantics, active state, anatomy, and Tailwind parts', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const contentRef = ref<ComponentPublicInstance | null>(null);

  const { container } = renderToc(
    `
      <Toc ref="rootRef" :items="items" :default-active-ids="['introduction']" data-probe="root">
        <TocContent ref="contentRef">
          <h2 id="introduction">Introduction</h2>
          <h3 id="configuration">Configuration</h3>
        </TocContent>
        <TocNav>
          <TocTitle>On this page</TocTitle>
          <TocList>
            <TocIndicator />
            <TocItem v-for="item in items" :key="item.value" :item="item">
              <TocLink :href="\`#\${item.value}\`">
                <TocRail v-if="item.value === 'configuration'" :depth="item.depth" :previous-depth="2" :next-depth="2" />
                {{ item.value }}
              </TocLink>
            </TocItem>
          </TocList>
        </TocNav>
      </Toc>
    `,
    () => ({ items, rootRef, contentRef }),
  );

  const root = rootRef.value?.$el as HTMLElement;
  const nav = screen.getByRole('navigation', { name: 'On this page' });
  const activeLink = screen.getByRole('link', { name: 'introduction' });
  const nestedItem = screen.getByRole('link', { name: 'configuration' }).closest('li');
  const indicator = container.querySelector('[data-slot="toc-indicator"]');
  const rail = container.querySelector('[data-slot="toc-rail"]');

  expect(root).toHaveClass('grid', 'gap-6');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(contentRef.value?.$el).toHaveAttribute('data-slot', 'toc-content');
  expect(nav).toHaveClass('rounded-lg', 'border', 'bg-card', 'p-4');
  expect(activeLink).toHaveAttribute('aria-current', 'location');
  expect(activeLink).toHaveAttribute('data-active');
  expect(nestedItem).toHaveAttribute('data-depth', '3');
  expect(indicator).toHaveClass('w-0.5', 'rounded-full', 'bg-muted-foreground');
  expect(rail).toHaveAttribute('aria-hidden', 'true');
  expect(rail?.querySelector('line')).toHaveClass('stroke-1');
});

// Ark Vue 5.39.2 / Zag 1.43.3 reports the old controlled activeIds in activeChange.
// Re-enable after the upstream machine invokes the callback with the requested ids.
test.skip('direct Ark controlled active-change reports the requested ids', async () => {
  const activeIds = ref(['introduction']);
  const change = rs.fn((details: { activeIds: string[] }) => {
    activeIds.value = details.activeIds;
  });
  render(
    defineComponent({
      components: { ...tocComponents, Toc: ArkTocRoot },
      setup: () => ({ items, activeIds, change }),
      template: `
    <Toc :items="items" :active-ids="activeIds" @active-change="change">
      <TocContent><h2 id="introduction">Introduction</h2><h3 id="configuration">Configuration</h3></TocContent>
      <TocNav><TocTitle>On this page</TocTitle><TocList>
        <TocItem v-for="item in items" :key="item.value" :item="item">
          <TocLink as-child><a :href="'#' + item.value">{{ item.value }}</a></TocLink>
        </TocItem>
      </TocList></TocNav>
      <TocContext v-slot="context">
        <button @click="context.setActiveIds(['configuration'])">Activate configuration</button>
      </TocContext>
    </Toc>
  `,
    }),
  );
  await fireEvent.click(screen.getByRole('button', { name: 'Activate configuration' }));
  await waitFor(() =>
    expect(screen.getByRole('link', { name: 'configuration' })).toHaveAttribute(
      'aria-current',
      'location',
    ),
  );
  expect(change).toHaveBeenCalledTimes(1);
  expect(change).toHaveBeenCalledWith(
    expect.objectContaining({
      activeIds: ['configuration'],
      activeItems: [items[1]],
    }),
  );
  expect(screen.getByRole('link', { name: 'configuration' })).toHaveAttribute(
    'data-slot',
    'toc-link',
  );
});

// Ark 5.39.2 TocNav uses getRootProps(), duplicating the root id in native Ark.
test.skip('direct Ark root and navigation have distinct ids', () => {
  const { container } = render(
    defineComponent({
      components: { ArkTocRoot, ArkTocNav },
      setup: () => ({ items }),
      template: '<ArkTocRoot :items="items"><ArkTocNav /></ArkTocRoot>',
    }),
  );
  const root = container.querySelector('[data-part="root"]')!;
  const nav = container.querySelector('nav')!;
  expect(nav.id).not.toBe(root.id);
});

test('keeps the RootProvider store and context available to surrounding composition', async () => {
  const RootProviderHarness = defineComponent({
    components: tocComponents,
    setup() {
      const toc = useToc({ items });

      return { items, toc };
    },
    template: `
      <button type="button" @click="toc.setActiveIds(['configuration'])">Set active section</button>
      <TocRootProvider :value="toc" style="color: red">
        <TocContent>
          <h2 id="introduction">Introduction</h2>
          <h3 id="configuration">Configuration</h3>
        </TocContent>
        <TocNav>
          <TocTitle>On this page</TocTitle>
          <TocList>
            <TocIndicator />
            <TocItem v-for="item in items" :key="item.value" :item="item">
              <TocLink :href="\`#\${item.value}\`">{{ item.value }}</TocLink>
            </TocItem>
          </TocList>
        </TocNav>
        <TocContext v-slot="context">
          <output role="status">{{ context.activeIds.join(', ') }}</output>
        </TocContext>
      </TocRootProvider>
    `,
  });

  render(RootProviderHarness);
  await fireEvent.click(screen.getByRole('button', { name: 'Set active section' }));

  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('configuration'));

  const rootProvider = screen.getByText('On this page').closest('[data-slot="toc-root-provider"]');

  await waitFor(() => expect(rootProvider).toHaveStyle('--top: 0px'));
  expect(rootProvider).toHaveAttribute('data-scope', 'toc');
  expect(rootProvider).toHaveAttribute('data-part', 'root');
  expect(rootProvider).toHaveStyle('color: red');
});

test('supports placement and scrolls the supplied reading pane', async () => {
  const ScrollableToc = defineComponent({
    components: tocComponents,
    setup() {
      const readerRef = ref<HTMLDivElement | null>(null);
      const scrollEl = () => readerRef.value;

      return { items, readerRef, scrollEl };
    },
    template: `
      <Toc :items="items" :scroll-el="scrollEl">
        <TocContent>
          <div ref="readerRef" aria-label="Reader">
            <h2 id="introduction">Introduction</h2>
            <h3 id="configuration">Configuration</h3>
          </div>
        </TocContent>
        <TocNav>
          <TocTitle>On this page</TocTitle>
          <TocList>
            <TocItem v-for="item in items" :key="item.value" :item="item">
              <TocLink :href="\`#\${item.value}\`">{{ item.value }}</TocLink>
            </TocItem>
          </TocList>
        </TocNav>
      </Toc>
    `,
  });

  const { unmount } = render(ScrollableToc);

  const reader = screen.getByLabelText('Reader');
  const heading = screen.getByRole('heading', { name: 'Configuration' });
  const scrollTo = rs.fn();

  (reader as HTMLElement & { scrollTo: typeof scrollTo }).scrollTo = scrollTo;
  rs.spyOn(reader, 'getBoundingClientRect').mockReturnValue({
    bottom: 200,
    height: 200,
    left: 0,
    right: 200,
    top: 10,
    width: 200,
    x: 0,
    y: 10,
    toJSON: () => ({}),
  });
  rs.spyOn(heading, 'getBoundingClientRect').mockReturnValue({
    bottom: 90,
    height: 20,
    left: 0,
    right: 200,
    top: 70,
    width: 200,
    x: 0,
    y: 70,
    toJSON: () => ({}),
  });

  await fireEvent.click(screen.getByRole('link', { name: 'configuration' }));

  expect(scrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 60 });

  unmount();
  renderToc(
    `
      <Toc :items="items">
        <TocNav placement="left"><TocTitle>Left navigation</TocTitle></TocNav>
      </Toc>
    `,
    () => ({ items }),
  );

  expect(screen.getByRole('navigation', { name: 'Left navigation' })).toHaveAttribute(
    'data-placement',
    'left',
  );
});

test('preserves semantic asChild composition and component refs', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const contentRef = ref<ComponentPublicInstance | null>(null);

  renderToc(
    `
      <Toc ref="rootRef" as-child :items="items" aria-label="Table of contents">
        <section>
          <TocContent ref="contentRef"><h2 id="introduction">Introduction</h2></TocContent>
        </section>
      </Toc>
    `,
    () => ({ items, rootRef, contentRef }),
  );

  const root = screen.getByRole('region', { name: 'Table of contents' });

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'toc-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(contentRef.value?.$el).toHaveAttribute('data-slot', 'toc-content');
});

test('keeps the flat API and lets consumer Tailwind classes override defaults', () => {
  renderToc(
    `
      <Toc class="w-auto" :items="items">
        <TocNav class="p-0"><TocTitle>On this page</TocTitle></TocNav>
      </Toc>
    `,
    () => ({ items }),
  );

  const root = screen
    .getByRole('navigation', { name: 'On this page' })
    .closest('[data-slot="toc-root"]');
  const nav = screen.getByRole('navigation', { name: 'On this page' });

  expect(Toc).not.toHaveProperty('Root');
  expect(root).toHaveClass('w-auto');
  expect(root).not.toHaveClass('w-full');
  expect(nav).toHaveClass('p-0');
  expect(nav).not.toHaveClass('p-4');
});

test('renders and hydrates the public anatomy on the server', async () => {
  const App = defineComponent({
    components: tocComponents,
    setup() {
      return { items };
    },
    template: `
      <Toc :items="items" :default-active-ids="['introduction']" aria-label="Table of contents">
        <TocContent><h2 id="introduction">Introduction</h2></TocContent>
        <TocNav><TocTitle>On this page</TocTitle><TocList>
          <TocItem v-for="item in items" :key="item.value" :item="item">
            <TocLink :href="'#' + item.value"><TocRail :depth="item.depth" />{{ item.value }}</TocLink>
          </TocItem>
        </TocList></TocNav>
      </Toc>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="toc-root"');
  expect(html).toContain('data-slot="toc-content"');
  expect(html).toContain('data-slot="toc-nav"');
  expect(html).toContain('data-slot="toc-title"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="toc-root"]');
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(App);
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelector('[data-slot="toc-root"]')).toBe(serverRoot);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    expect(host.querySelector<SVGSVGElement>('[data-slot="toc-rail"]')?.style.width).toBe('2px');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});