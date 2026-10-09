import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, h, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Marquee,
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
  MarqueeRootProvider,
  MarqueeViewport,
  useMarquee,
  useMarqueeContext,
} from '../src';
import { LocaleProvider } from '../src/locale';
import SsrMarquee from './fixtures/SsrMarquee.vue';

const marqueeComponents = {
  LocaleProvider,
  Marquee,
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
  MarqueeRootProvider,
  MarqueeViewport,
};

const TestMarquee = defineComponent({
  components: marqueeComponents,
  props: {
    defaultPaused: { type: Boolean, default: undefined },
    paused: { type: Boolean, default: undefined },
  },
  template: `
    <Marquee aria-label="Partner logos" :default-paused="defaultPaused" :paused="paused">
      <MarqueeEdge side="start" />
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem>Atlas</MarqueeItem>
          <MarqueeItem>Beacon</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
      <MarqueeEdge side="end" />
    </Marquee>
  `,
});

test('preserves Ark marquee anatomy, semantics, and Tailwind styling hooks', async () => {
  const App = defineComponent({
    components: marqueeComponents,
    template: '<LocaleProvider locale="ar"><TestMarquee /></LocaleProvider>',
  });

  render(App, { global: { components: { TestMarquee } } });

  const root = screen.getByRole('region', { name: 'Partner logos' });
  const viewport = root.querySelector('[data-part="viewport"]');
  const content = root.querySelector('[data-part="content"]');
  const item = root.querySelector('[data-part="item"]');
  const edges = root.querySelectorAll('[data-part="edge"]');

  const rootLocator = page.getByRole('region', { name: 'Partner logos', exact: true });
  await expect.element(rootLocator).toHaveAttribute('aria-roledescription', 'marquee');
  await expect.element(rootLocator).toHaveAttribute('data-slot', 'marquee-root');
  await expect.element(rootLocator).toHaveAttribute('dir', 'rtl');
  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['group', 'relative', 'w-full', 'overflow-hidden', 'text-foreground']),
  );
  expect(viewport!.getAttribute('data-slot')).toBe('marquee-viewport');
  expect([...viewport!.classList]).toEqual(expect.arrayContaining(['size-full']));
  expect(content!.getAttribute('data-slot')).toBe('marquee-content');
  expect([...content!.classList]).toEqual(expect.arrayContaining(['animate-moduix-marquee-x']));
  expect(item!.getAttribute('data-slot')).toBe('marquee-item');
  expect([...item!.classList]).toEqual(expect.arrayContaining(['shrink-0']));
  expect(edges[0]!.getAttribute('data-slot')).toBe('marquee-edge');
  expect([...edges[0]!.classList]).toEqual(
    expect.arrayContaining(['w-1/5', 'bg-linear-to-r', 'from-background', 'to-transparent']),
  );
  expect(edges[1]!.getAttribute('data-slot')).toBe('marquee-edge');
  expect(edges).toHaveLength(2);
  expect(edges[0]!.getAttribute('dir')).toBe('rtl');
  expect(edges[1]!.getAttribute('dir')).toBe('rtl');
});

test('lets consumer Tailwind utilities override conflicting defaults', () => {
  const App = defineComponent({
    components: marqueeComponents,
    template: `
      <Marquee aria-label="Partner logos" class="w-1/2 text-primary">
        <MarqueeViewport>
          <MarqueeContent><MarqueeItem>Atlas</MarqueeItem></MarqueeContent>
        </MarqueeViewport>
        <MarqueeEdge side="start" class="w-1/4" data-testid="edge" />
      </Marquee>
    `,
  });

  render(App);

  const root = screen.getByRole('region', { name: 'Partner logos' });
  const edge = screen.getByTestId('edge');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-1/2', 'text-primary']));
  expect(['w-full', 'text-foreground'].some((name) => root!.classList.contains(name))).toBe(false);
  expect([...edge!.classList]).toEqual(expect.arrayContaining(['w-1/4']));
  expect(edge!.classList.contains('w-1/5')).toBe(false);
  expect(root.getBoundingClientRect().width).toBeGreaterThan(0);
  expect(root.getBoundingClientRect().width).toBeCloseTo(
    root.parentElement!.getBoundingClientRect().width / 2,
  );
  expect(edge.getBoundingClientRect().width).toBeCloseTo(root.getBoundingClientRect().width / 4);
});

test('lets consumers override the vertical height', async () => {
  const App = defineComponent({
    components: marqueeComponents,
    template: `
      <Marquee side="bottom" class="h-96">
        <MarqueeViewport>
          <MarqueeContent><MarqueeItem>Atlas</MarqueeItem></MarqueeContent>
        </MarqueeViewport>
      </Marquee>
    `,
  });

  render(App);

  const root = screen.getByRole('region');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['h-96']));
  expect(root!.classList.contains('h-60')).toBe(false);
  await expect.element(page.locator('[data-slot="marquee-root"]')).toHaveCSS('height', '384px');
});

test('forwards part refs and keeps cloned content out of the accessibility tree', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();
  const App = defineComponent({
    components: marqueeComponents,
    setup() {
      return { itemRef, rootRef };
    },
    template: `
      <Marquee ref="rootRef" aria-label="Partner logos">
        <MarqueeViewport>
          <MarqueeContent>
            <MarqueeItem ref="itemRef">Atlas</MarqueeItem>
          </MarqueeContent>
        </MarqueeViewport>
      </Marquee>
    `,
  });

  render(App);

  const root = screen.getByRole('region', { name: 'Partner logos' });
  const [content, clone] = root.querySelectorAll('[data-part="content"]');

  expect(rootRef.value?.$el).toBe(root);
  expect(itemRef.value!.$el.textContent).toContain('Atlas');
  expect(content!.hasAttribute('aria-hidden')).toBe(false);
  expect(clone!.hasAttribute('data-clone')).toBe(true);
  expect(clone!.getAttribute('aria-hidden')).toBe('true');
  expect(clone!.getAttribute('role')).toBe('presentation');
});

test('preserves Ark controlled and uncontrolled pause state', async () => {
  const { rerender } = render(TestMarquee, { props: { defaultPaused: true } });

  const rootLocator = page.getByRole('region', { name: 'Partner logos', exact: true });
  await expect.element(rootLocator).toHaveAttribute('data-state', 'paused');
  await expect.element(rootLocator).toHaveAttribute('data-paused');

  await rerender({ paused: false });

  await expect.element(rootLocator).toHaveAttribute('data-state', 'idle');
  await expect.element(rootLocator).not.toHaveAttribute('data-paused');
});

const ContextPauseControl = defineComponent({
  setup() {
    const marquee = useMarqueeContext();
    const handlePause = () => marquee.value.pause();
    return { handlePause };
  },
  template: '<button type="button" @click="handlePause">Pause marquee</button>',
});

test('pauses on hover and resumes with the original callback details', async () => {
  const pauseChanges: Array<{ paused: boolean }> = [];
  const paused = ref(false);
  const App = defineComponent({
    components: marqueeComponents,
    setup() {
      return { pauseChanges, paused };
    },
    template: `
      <Marquee
        v-model:paused="paused"
        aria-label="Partner logos"
        pause-on-interaction
        @pause-change="pauseChanges.push($event)"
      >
        <MarqueeViewport>
          <MarqueeContent><MarqueeItem>Atlas</MarqueeItem></MarqueeContent>
        </MarqueeViewport>

      </Marquee>
    `,
  });

  render({ render: () => h('button', { type: 'button' }, 'Outside marquee') });
  await page.getByRole('button', { name: 'Outside marquee', exact: true }).hover();

  render(App);

  const rootLocator = page.getByRole('region', { name: 'Partner logos', exact: true });
  await rootLocator.hover();

  await expect.element(rootLocator).toHaveAttribute('data-paused');
  const content = page.locator('[data-slot="marquee-content"]').nth(0);
  await expect.element(content).toHaveCSS('animation-play-state', 'paused');
  await expect.poll(() => paused.value).toBe(true);
  await expect.poll(() => pauseChanges).toEqual([{ paused: true }]);

  await page.getByRole('button', { name: 'Outside marquee', exact: true }).hover();

  await expect.element(rootLocator).not.toHaveAttribute('data-paused');
  await expect.element(content).toHaveCSS('animation-play-state', 'running');
  await expect.poll(() => paused.value).toBe(false);
  await expect.poll(() => pauseChanges).toEqual([{ paused: true }, { paused: false }]);
});

test('preserves the root host element with asChild', async () => {
  const App = defineComponent({
    components: marqueeComponents,
    template: `
      <Marquee as-child>
        <a href="/partners" aria-label="Partner logos" />
      </Marquee>
    `,
  });

  render(App);

  const root = screen.getByRole('region', { name: 'Partner logos' });

  expect(root.tagName).toBe('A');
  const rootLocator = page.getByRole('region', { name: 'Partner logos', exact: true });
  await expect.element(rootLocator).toHaveAttribute('href', '/partners');
  await expect.element(rootLocator).toHaveAttribute('data-slot', 'marquee-root');
  await expect.element(rootLocator).toHaveAttribute('data-scope', 'marquee');
});

test('styles a RootProvider tree created by the public hook', async () => {
  const pauseChanges: Array<{ paused: boolean }> = [];
  const App = defineComponent({
    components: { ...marqueeComponents, ContextPauseControl },
    setup() {
      return {
        marquee: useMarquee({
          translations: { root: 'Partner logos' },
          onPauseChange: (details) => pauseChanges.push(details),
        }),
      };
    },
    template: `
      <MarqueeRootProvider :value="marquee">
        <MarqueeViewport>
          <MarqueeContent><MarqueeItem>Atlas</MarqueeItem></MarqueeContent>
        </MarqueeViewport>
        <ContextPauseControl />
      </MarqueeRootProvider>
    `,
  });

  render(App);

  await expect
    .element(page.getByRole('region', { name: 'Partner logos', exact: true }))
    .toHaveAttribute('data-slot', 'marquee-root-provider');
  await page.getByRole('button', { name: 'Pause marquee', exact: true }).click();
  await expect
    .element(page.getByRole('region', { name: 'Partner logos', exact: true }))
    .toHaveAttribute('data-paused');
  expect(pauseChanges).toEqual([{ paused: true }]);
});

test('hydrates stable hosts and ids and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrMarquee));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="marquee-root"]');
  const serverNodes = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(serverRoot).not.toBeNull();
  expect(serverIds.length).toBeGreaterThan(0);
  const app = createSSRApp(SsrMarquee);
  try {
    app.mount(host);
    expect(host.querySelector('[data-slot="marquee-root"]')).toBe(serverRoot);
    expect([...host.querySelectorAll('[data-slot]')]).toEqual(serverNodes);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await page.getByRole('button', { name: 'Pause marquee', exact: true }).click();
    await expect
      .element(page.getByRole('region', { name: 'Partner logos', exact: true }))
      .toHaveAttribute('data-paused');
  } finally {
    app.unmount();
    host.remove();
  }
});