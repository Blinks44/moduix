import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
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

test('preserves Ark marquee anatomy, semantics, attrs, and moduix styling hooks', () => {
  const App = defineComponent({
    components: marqueeComponents,
    template: '<LocaleProvider locale="ar"><TestMarquee /></LocaleProvider>',
  });

  render(App, { global: { components: { TestMarquee } } });

  const root = screen.getByRole('region', { name: 'Partner logos' });
  const viewport = root.querySelector('[data-part="viewport"]');
  const content = root.querySelector('[data-part="content"]');

  expect(root).toHaveAttribute('aria-roledescription', 'marquee');
  expect(root).toHaveAttribute('data-slot', 'marquee-root');
  expect(root).toHaveAttribute('dir', 'rtl');
  expect(viewport).toHaveAttribute('data-slot', 'marquee-viewport');
  expect(content).toHaveAttribute('data-slot', 'marquee-content');
  expect(root.querySelector('[data-part="item"]')).toHaveAttribute('data-slot', 'marquee-item');
  expect(root.querySelector('[data-side="start"]')).toHaveAttribute('data-slot', 'marquee-edge');
  expect(root.querySelector('[data-side="end"]')).toHaveAttribute('data-slot', 'marquee-edge');
  expect(root.querySelectorAll('[data-part="edge"]')).toHaveLength(2);
  expect(root.querySelectorAll('[data-part="edge"]')[0]).toHaveAttribute('dir', 'rtl');
  expect(root.querySelectorAll('[data-part="edge"]')[1]).toHaveAttribute('dir', 'rtl');
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
  expect(itemRef.value?.$el).toHaveTextContent('Atlas');
  expect(content).not.toHaveAttribute('aria-hidden');
  expect(clone).toHaveAttribute('data-clone');
  expect(clone).toHaveAttribute('aria-hidden', 'true');
  expect(clone).toHaveAttribute('role', 'presentation');
});

test('preserves Ark controlled and uncontrolled pause state', async () => {
  const { rerender } = render(TestMarquee, { props: { defaultPaused: true } });

  const root = screen.getByRole('region', { name: 'Partner logos' });

  expect(root).toHaveAttribute('data-state', 'paused');
  expect(root).toHaveAttribute('data-paused');

  await rerender({ paused: false });

  expect(root).toHaveAttribute('data-state', 'idle');
  expect(root).not.toHaveAttribute('data-paused');
});

test('preserves interaction pause behavior, callback details, v-model, and context controls', async () => {
  const pauseChanges: Array<{ paused: boolean }> = [];
  const ContextPauseControl = defineComponent({
    setup() {
      const marquee = useMarqueeContext();
      const handlePause = () => marquee.value.pause();
      return { handlePause };
    },
    template: '<button type="button" @click="handlePause">Pause marquee</button>',
  });
  const paused = ref(false);
  const App = defineComponent({
    components: { ...marqueeComponents, ContextPauseControl },
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
        <ContextPauseControl />
      </Marquee>
    `,
  });

  render(App);

  const root = screen.getByRole('region', { name: 'Partner logos' });

  await fireEvent.mouseEnter(root);

  await waitFor(() => {
    expect(root).toHaveAttribute('data-paused');
    expect(paused.value).toBe(true);
    expect(pauseChanges).toEqual([{ paused: true }]);
  });

  await fireEvent.mouseLeave(root);

  await waitFor(() => {
    expect(root).not.toHaveAttribute('data-paused');
    expect(paused.value).toBe(false);
    expect(pauseChanges).toEqual([{ paused: true }, { paused: false }]);
  });

  await fireEvent.click(screen.getByRole('button', { name: 'Pause marquee' }));

  await waitFor(() => {
    expect(root).toHaveAttribute('data-paused');
    expect(pauseChanges).toEqual([{ paused: true }, { paused: false }, { paused: true }]);
  });
});

test('preserves the root host element with asChild', () => {
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
  expect(root).toHaveAttribute('href', '/partners');
  expect(root).toHaveAttribute('data-slot', 'marquee-root');
  expect(root).toHaveAttribute('data-scope', 'marquee');
});

test('styles a RootProvider tree created by the public hook', () => {
  const App = defineComponent({
    components: marqueeComponents,
    setup() {
      return { marquee: useMarquee({ translations: { root: 'Partner logos' } }) };
    },
    template: `
      <MarqueeRootProvider :value="marquee">
        <MarqueeViewport>
          <MarqueeContent><MarqueeItem>Atlas</MarqueeItem></MarqueeContent>
        </MarqueeViewport>
      </MarqueeRootProvider>
    `,
  });

  render(App);

  expect(screen.getByRole('region', { name: 'Partner logos' })).toHaveAttribute(
    'data-slot',
    'marquee-root-provider',
  );
});

test('renders and hydrates the public anatomy through Vue SSR', async () => {
  const App = defineComponent({
    components: marqueeComponents,
    template: `
      <Marquee aria-label="Partner logos">
        <MarqueeViewport>
          <MarqueeContent><MarqueeItem>Atlas</MarqueeItem></MarqueeContent>
        </MarqueeViewport>
      </Marquee>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="marquee-root"');
  expect(html).toContain('data-slot="marquee-viewport"');
  expect(html).toContain('data-slot="marquee-content"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);

  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  expect(host.querySelector('[data-slot="marquee-root"]')).toBeInTheDocument();

  app.unmount();
  host.remove();
});