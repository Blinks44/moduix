import { LocaleProvider } from '@ark-ui/solid/locale';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Marquee, MarqueeContent, MarqueeEdge, MarqueeItem, MarqueeViewport } from '@/index';

function TestMarquee(props: { defaultPaused?: boolean; paused?: boolean }) {
  return (
    <Marquee aria-label="Partner logos" defaultPaused={props.defaultPaused} paused={props.paused}>
      <MarqueeEdge side="start" />
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem>Atlas</MarqueeItem>
          <MarqueeItem>Beacon</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
      <MarqueeEdge side="end" />
    </Marquee>
  );
}

test('preserves Ark marquee anatomy, semantics, and Tailwind styling hooks', async () => {
  render(() => (
    <LocaleProvider locale="ar">
      <TestMarquee />
    </LocaleProvider>
  ));

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
  render(() => (
    <Marquee aria-label="Partner logos" class="w-1/2 text-primary">
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem>Atlas</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
      <MarqueeEdge side="start" class="w-1/4" data-testid="edge" />
    </Marquee>
  ));

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
  render(() => (
    <Marquee side="bottom" class="h-96">
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem>Atlas</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
    </Marquee>
  ));

  const root = screen.getByRole('region');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['h-96']));
  await expect.element(page.locator('[data-slot="marquee-root"]')).toHaveCSS('height', '384px');
});