import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  LocaleProvider,
  Marquee,
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
  MarqueeRootProvider,
  MarqueeViewport,
  useMarquee,
  useMarqueeContext,
} from '../src';

function TestMarquee({ defaultPaused, paused }: { defaultPaused?: boolean; paused?: boolean }) {
  return (
    <Marquee aria-label="Partner logos" defaultPaused={defaultPaused} paused={paused}>
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

test('preserves Ark marquee anatomy, semantics, and moduix styling hooks', async () => {
  render(
    <LocaleProvider locale="ar">
      <TestMarquee />
    </LocaleProvider>,
  );

  const root = screen.getByRole('region', { name: 'Partner logos' });
  const viewport = root.querySelector('[data-part="viewport"]');
  const content = root.querySelector('[data-part="content"]');

  const rootLocator = page.getByRole('region', { name: 'Partner logos', exact: true });
  await expect.element(rootLocator).toHaveAttribute('aria-roledescription', 'marquee');
  await expect.element(rootLocator).toHaveAttribute('data-slot', 'marquee-root');
  await expect.element(rootLocator).toHaveAttribute('dir', 'rtl');
  expect(viewport!.getAttribute('data-slot')).toBe('marquee-viewport');
  expect(content!.getAttribute('data-slot')).toBe('marquee-content');
  expect(root.querySelector('[data-part="item"]')!.getAttribute('data-slot')).toBe('marquee-item');
  expect(root.querySelector('[data-side="start"]')!.getAttribute('data-slot')).toBe('marquee-edge');
  expect(root.querySelector('[data-side="end"]')!.getAttribute('data-slot')).toBe('marquee-edge');
  expect(root.querySelectorAll('[data-part="edge"]')).toHaveLength(2);
  expect(root.querySelectorAll('[data-part="edge"]')[0]!.getAttribute('dir')).toBe('rtl');
  expect(root.querySelectorAll('[data-part="edge"]')[1]!.getAttribute('dir')).toBe('rtl');
});

test('forwards part refs and keeps cloned content out of the accessibility tree', () => {
  const rootRef = createRef<HTMLDivElement>();
  const itemRef = createRef<HTMLDivElement>();

  render(
    <Marquee ref={rootRef} aria-label="Partner logos">
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem ref={itemRef}>Atlas</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
    </Marquee>,
  );

  const root = screen.getByRole('region', { name: 'Partner logos' });
  const [content, clone] = root.querySelectorAll('[data-part="content"]');

  expect(rootRef.current).toBe(root);
  expect(itemRef.current!.textContent).toContain('Atlas');
  expect(content!.hasAttribute('aria-hidden')).toBe(false);
  expect(clone!.hasAttribute('data-clone')).toBe(true);
  expect(clone!.getAttribute('aria-hidden')).toBe('true');
  expect(clone!.getAttribute('role')).toBe('presentation');
});

test('preserves Ark controlled and uncontrolled pause state', async () => {
  const { rerender } = render(<TestMarquee defaultPaused />);

  const rootLocator = page.getByRole('region', { name: 'Partner logos', exact: true });
  await expect.element(rootLocator).toHaveAttribute('data-state', 'paused');
  await expect.element(rootLocator).toHaveAttribute('data-paused');

  rerender(<TestMarquee paused={false} />);

  await expect.element(rootLocator).toHaveAttribute('data-state', 'idle');
  await expect.element(rootLocator).not.toHaveAttribute('data-paused');
});

function ContextPauseControl() {
  const marquee = useMarqueeContext();

  return (
    <button type="button" onClick={() => marquee.pause()}>
      Pause marquee
    </button>
  );
}

test('pauses on hover and resumes with the original callback details', async () => {
  const onPauseChange = rs.fn();

  render(<button type="button">Outside marquee</button>);
  await page.getByRole('button', { name: 'Outside marquee', exact: true }).hover();

  render(
    <Marquee aria-label="Partner logos" pauseOnInteraction onPauseChange={onPauseChange}>
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem>Atlas</MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
    </Marquee>,
  );

  const rootLocator = page.getByRole('region', { name: 'Partner logos', exact: true });
  await rootLocator.hover();

  await expect.element(rootLocator).toHaveAttribute('data-paused');
  const content = page.locator('[data-slot="marquee-content"]').nth(0);
  await expect.element(content).toHaveCSS('animation-play-state', 'paused');
  await expect.poll(() => onPauseChange).toHaveBeenLastCalledWith({ paused: true });

  await page.getByRole('button', { name: 'Outside marquee', exact: true }).hover();

  await expect.element(rootLocator).not.toHaveAttribute('data-paused');
  await expect.element(content).toHaveCSS('animation-play-state', 'running');
  await expect.poll(() => onPauseChange).toHaveBeenLastCalledWith({ paused: false });
});

test('preserves the root host element with asChild', async () => {
  render(
    <Marquee asChild>
      <a href="/partners" aria-label="Partner logos" />
    </Marquee>,
  );

  const root = screen.getByRole('region', { name: 'Partner logos' });

  expect(root.tagName).toBe('A');
  const rootLocator = page.getByRole('region', { name: 'Partner logos', exact: true });
  await expect.element(rootLocator).toHaveAttribute('href', '/partners');
  await expect.element(rootLocator).toHaveAttribute('data-slot', 'marquee-root');
  await expect.element(rootLocator).toHaveAttribute('data-scope', 'marquee');
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

  render(<ProviderMarquee />);

  await expect
    .element(page.getByRole('region', { name: 'Partner logos', exact: true }))
    .toHaveAttribute('data-slot', 'marquee-root-provider');
  await page.getByRole('button', { name: 'Pause marquee', exact: true }).click();
  await expect
    .element(page.getByRole('region', { name: 'Partner logos', exact: true }))
    .toHaveAttribute('data-paused');
  expect(pauseChanges).toEqual([{ paused: true }]);
});