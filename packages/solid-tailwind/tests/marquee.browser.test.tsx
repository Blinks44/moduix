import { LocaleProvider } from '@ark-ui/solid/locale';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
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
  expect(root!.classList.contains('h-60')).toBe(false);
  await expect.element(page.locator('[data-slot="marquee-root"]')).toHaveCSS('height', '384px');
});

test('forwards part refs and keeps cloned content out of the accessibility tree', () => {
  let rootRef!: HTMLDivElement;
  let itemRef!: HTMLDivElement;

  render(() => (
    <Marquee ref={(element) => (rootRef = element)} aria-label="Partner logos">
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem ref={(element) => (itemRef = element)}>Atlas</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
    </Marquee>
  ));

  const root = screen.getByRole('region', { name: 'Partner logos' });
  const [content, clone] = root.querySelectorAll('[data-part="content"]');

  expect(rootRef).toBe(root);
  expect(itemRef!.textContent).toContain('Atlas');
  expect(content!.hasAttribute('aria-hidden')).toBe(false);
  expect(clone!.hasAttribute('data-clone')).toBe(true);
  expect(clone!.getAttribute('aria-hidden')).toBe('true');
  expect(clone!.getAttribute('role')).toBe('presentation');
});

test('preserves Ark controlled and uncontrolled pause state', async () => {
  let setPaused!: (paused: boolean | undefined) => void;

  render(() => {
    const [paused, updatePaused] = createSignal<boolean | undefined>();
    setPaused = updatePaused;

    return (
      <Marquee aria-label="Partner logos" defaultPaused paused={paused()}>
        <MarqueeViewport>
          <MarqueeContent>
            <MarqueeItem>Atlas</MarqueeItem>
          </MarqueeContent>
        </MarqueeViewport>
      </Marquee>
    );
  });

  const rootLocator = page.getByRole('region', { name: 'Partner logos', exact: true });
  await expect.element(rootLocator).toHaveAttribute('data-state', 'paused');
  await expect.element(rootLocator).toHaveAttribute('data-paused');

  setPaused(false);
  await expect.element(rootLocator).toHaveAttribute('data-state', 'idle');
  await expect.element(rootLocator).not.toHaveAttribute('data-paused');
});

function ContextPauseControl() {
  const marquee = useMarqueeContext();

  return (
    <button type="button" onClick={() => marquee().pause()}>
      Pause marquee
    </button>
  );
}

test('pauses on hover and resumes with the original callback details', async () => {
  const pauseChanges: Array<{ paused: boolean }> = [];

  render(() => <button type="button">Outside marquee</button>);
  await page.getByRole('button', { name: 'Outside marquee', exact: true }).hover();

  render(() => (
    <Marquee
      aria-label="Partner logos"
      pauseOnInteraction
      onPauseChange={(details) => pauseChanges.push(details)}
    >
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem>Atlas</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
    </Marquee>
  ));

  const rootLocator = page.getByRole('region', { name: 'Partner logos', exact: true });
  await rootLocator.hover();

  await expect.element(rootLocator).toHaveAttribute('data-paused');
  const content = page.locator('[data-slot="marquee-content"]').nth(0);
  await expect.element(content).toHaveCSS('animation-play-state', 'paused');
  await expect.poll(() => pauseChanges.at(-1)).toEqual({ paused: true });

  await page.getByRole('button', { name: 'Outside marquee', exact: true }).hover();

  await expect.element(rootLocator).not.toHaveAttribute('data-paused');
  await expect.element(content).toHaveCSS('animation-play-state', 'running');
  await expect.poll(() => pauseChanges.at(-1)).toEqual({ paused: false });
});

test('preserves the root host element with asChild', async () => {
  render(() => (
    <Marquee asChild={(props) => <a {...props()} href="/partners" aria-label="Partner logos" />} />
  ));

  const root = screen.getByRole('region', { name: 'Partner logos' });

  expect(root.tagName).toBe('A');
  const rootLocator = page.getByRole('region', { name: 'Partner logos', exact: true });
  await expect.element(rootLocator).toHaveAttribute('href', '/partners');
  await expect.element(rootLocator).toHaveAttribute('data-slot', 'marquee-root');
  await expect.element(rootLocator).toHaveAttribute('data-scope', 'marquee');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLDivElement | undefined;

  render(() => (
    <Marquee
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} />}
      aria-label="Partner logos"
    />
  ));

  expect(rootRef).toBeUndefined();
});

test('styles a RootProvider tree created by the public hook', async () => {
  const pauseChanges: Array<{ paused: boolean }> = [];
  function ProviderMarquee() {
    const marquee = useMarquee({
      translations: { root: 'Partner logos' },
      onPauseChange: (details) => pauseChanges.push(details),
    });

    return (
      <MarqueeRootProvider value={marquee}>
        <MarqueeViewport>
          <MarqueeContent>
            <MarqueeItem>Atlas</MarqueeItem>
          </MarqueeContent>
        </MarqueeViewport>
        <ContextPauseControl />
      </MarqueeRootProvider>
    );
  }

  render(() => <ProviderMarquee />);

  await expect
    .element(page.getByRole('region', { name: 'Partner logos', exact: true }))
    .toHaveAttribute('data-slot', 'marquee-root-provider');
  await page.getByRole('button', { name: 'Pause marquee', exact: true }).click();
  await expect
    .element(page.getByRole('region', { name: 'Partner logos', exact: true }))
    .toHaveAttribute('data-paused');
  expect(pauseChanges).toEqual([{ paused: true }]);
});