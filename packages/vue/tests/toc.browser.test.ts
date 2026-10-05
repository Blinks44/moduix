import { TocNav as ArkTocNav, TocRoot as ArkTocRoot } from '@ark-ui/vue/toc';
import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { computed, createSSRApp, defineComponent, ref } from 'vue';
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
import TestToc from './fixtures/TestToc.vue';

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
  expect(rail.querySelector('path')?.getAttribute('d')).toBe('M 0.5 0 C 0.5 8 12.5 4 12.5 12');
  depth.value = 4;
  await expect.poll(() => rail.style.width).toBe('26px');
  expect(rail.style.width).toBe('26px');
  expect(rail.querySelector('line')?.getAttribute('x1')).toBe('24.5');
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
  await expect.element(page.getByRole('status')).toContainText('introduction');
  await page.getByRole('button', { name: 'Activate configuration' }).click();
  expect(emit).toHaveBeenCalledTimes(1);
  expect(emit).toHaveBeenCalledWith(
    'activeChange',
    expect.objectContaining({
      activeIds: ['configuration'],
    }),
  );
  expect(onActiveChange).toHaveBeenCalledTimes(1);
  await expect.element(page.getByRole('status')).toContainText('configuration');
  activeIds.value = ['introduction'];
  await expect.element(page.getByRole('status')).toContainText('introduction');
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

test('preserves Ark navigation semantics, active state, anatomy, attrs, and refs', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const contentRef = ref<ComponentPublicInstance | null>(null);

  renderToc(
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

  const nav = page.getByRole('navigation', { name: 'On this page' });
  const activeLink = page.getByRole('link', { name: 'introduction' });
  const nestedItem = page
    .locator('[data-slot="toc-item"]')
    .filter({ has: page.getByRole('link', { name: 'configuration' }) });
  const root = rootRef.value?.$el as HTMLElement;

  expect(root?.getAttribute('data-slot')).toBe('toc-root');
  expect(root?.getAttribute('data-scope')).toBe('toc');
  expect(root?.getAttribute('data-probe')).toBe('root');
  expect(contentRef.value?.$el?.getAttribute('data-slot')).toBe('toc-content');
  await expect.element(nav).toBeAttached();
  await expect.element(activeLink).toHaveAttribute('aria-current', 'location');
  await expect.element(activeLink).toHaveAttribute('data-active');
  await expect.element(nestedItem).toHaveAttribute('data-depth', '3');
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
  await page.getByRole('button', { name: 'Activate configuration' }).click();
  await expect
    .element(page.getByRole('link', { name: 'configuration' }))
    .toHaveAttribute('aria-current', 'location');
  expect(change).toHaveBeenCalledTimes(1);
  expect(change).toHaveBeenCalledWith(
    expect.objectContaining({
      activeIds: ['configuration'],
      activeItems: [items[1]],
    }),
  );
  await expect
    .element(page.getByRole('link', { name: 'configuration' }))
    .toHaveAttribute('data-slot', 'toc-link');
});

// Ark 5.39.2 TocNav uses getRootProps(), duplicating the root id in native Ark.
test.skip('direct Ark root and navigation have distinct ids', async () => {
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
  await page.getByRole('button', { name: 'Set active section' }).click();

  await expect.element(page.getByRole('status')).toContainText('configuration');

  const rootProvider = page.locator('[data-slot="toc-root-provider"]');

  const rootElement = document.querySelector<HTMLElement>('[data-slot="toc-root-provider"]')!;
  const activeItem = rootElement.querySelector<HTMLElement>('[data-slot="toc-item"][data-active]')!;
  const list = rootElement.querySelector<HTMLElement>('[data-slot="toc-list"]')!;
  await expect
    .poll(() => parseFloat(rootElement.style.getPropertyValue('--top')))
    .toBeCloseTo(
      activeItem.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop,
      0,
    );
  await expect.element(rootProvider).toHaveAttribute('data-scope', 'toc');
  await expect.element(rootProvider).toHaveAttribute('data-part', 'root');
  await expect.element(rootProvider).toHaveCSS('color', 'rgb(255, 0, 0)');
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
          <div ref="readerRef" aria-label="Reader" style="height: 200px; overflow: auto">
            <h2 id="introduction" style="height: 600px; margin: 0">Introduction</h2>
            <h3 id="configuration" style="height: 400px; margin: 0">Configuration</h3>
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

  const reader = document.querySelector<HTMLElement>('[aria-label="Reader"]')!;
  const heading = document.getElementById('configuration')!;
  const windowScroll = window.scrollY;

  await page.getByRole('link', { name: 'configuration' }).click();

  await expect.poll(() => reader.scrollTop).toBeGreaterThan(0);
  await expect
    .poll(() => heading.getBoundingClientRect().top - reader.getBoundingClientRect().top)
    .toBeCloseTo(0, 0);
  expect(window.scrollY).toBe(windowScroll);

  unmount();
  renderToc(
    `
      <Toc :items="items">
        <TocNav placement="left"><TocTitle>Left navigation</TocTitle></TocNav>
      </Toc>
    `,
    () => ({ items }),
  );

  await expect
    .element(page.getByRole('navigation', { name: 'Left navigation' }))
    .toHaveAttribute('data-placement', 'left');
});

test('preserves semantic asChild composition and component refs', async () => {
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

  const root = document.querySelector<HTMLElement>('[data-slot="toc-root"]')!;

  expect(root.tagName).toBe('SECTION');
  expect(root?.getAttribute('data-slot')).toBe('toc-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(contentRef.value?.$el?.getAttribute('data-slot')).toBe('toc-content');
});

test('keeps the flat API and merges consumer classes after CSS Modules defaults', async () => {
  renderToc(
    `
      <Toc class="consumer-root" :items="items">
        <TocNav class="consumer-nav"><TocTitle>On this page</TocTitle></TocNav>
      </Toc>
    `,
    () => ({ items }),
  );

  const root = document.querySelector('[data-slot="toc-root"]')!;

  expect(Toc).not.toHaveProperty('Root');
  expect([...root!.classList]).toEqual(expect.arrayContaining(['consumer-root']));
  expect([...document.querySelector('[data-slot="toc-nav"]')!.classList]).toEqual(
    expect.arrayContaining(['consumer-nav']),
  );
});

test('hydrates without replacing hosts, id drift, or warnings', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestToc));
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="toc-root"]');
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestToc);
  try {
    app.mount(host);
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