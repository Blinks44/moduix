import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { defineComponent } from 'vue';
import {
  Marquee,
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
  MarqueeRootProvider,
  MarqueeViewport,
} from '@/index';
import { LocaleProvider } from '@/locale';

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
  expect(viewport!.getAttribute('data-slot')).toBe('marquee-viewport');
  expect(content!.getAttribute('data-slot')).toBe('marquee-content');
  expect(item!.getAttribute('data-slot')).toBe('marquee-item');
  expect(edges[0]!.getAttribute('data-slot')).toBe('marquee-edge');
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
  expect([...edge!.classList]).toEqual(expect.arrayContaining(['w-1/4']));
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
  await expect.element(page.locator('[data-slot="marquee-root"]')).toHaveCSS('height', '384px');
});