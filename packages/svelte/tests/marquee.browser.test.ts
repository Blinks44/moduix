import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildMarquee from './marquee/AsChildMarquee.svelte';
import PauseMarquee from './marquee/PauseMarquee.svelte';
import ProviderMarquee from './marquee/ProviderMarquee.svelte';
import RefsMarquee from './marquee/RefsMarquee.svelte';
import TestMarquee from './marquee/TestMarquee.svelte';

test('preserves Ark marquee anatomy, semantics, attrs, and moduix styling hooks', async () => {
  render(TestMarquee, { props: { locale: 'ar' } });

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
  const { component } = render(RefsMarquee);

  const root = screen.getByRole('region', { name: 'Partner logos' });
  const [content, clone] = root.querySelectorAll('[data-part="content"]');

  expect(component.getRefs().rootRef).toBe(root);
  expect(component.getRefs().itemRef!.textContent).toContain('Atlas');
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

test('pauses on hover and resumes with the original callback details', async () => {
  const outside = document.createElement('button');
  outside.type = 'button';
  outside.textContent = 'Outside marquee';
  document.body.append(outside);
  try {
    await page.getByRole('button', { name: 'Outside marquee', exact: true }).hover();

    const { component } = render(PauseMarquee);

    const rootLocator = page.getByRole('region', { name: 'Partner logos', exact: true });
    await rootLocator.hover();

    await expect.element(rootLocator).toHaveAttribute('data-paused');
    const content = page.locator('[data-slot="marquee-content"]').nth(0);
    await expect.element(content).toHaveCSS('animation-play-state', 'paused');
    await expect.poll(() => component.getState().paused).toBe(true);
    await expect.poll(() => [...component.getState().pauseChanges]).toEqual([{ paused: true }]);

    await page.getByRole('button', { name: 'Outside marquee', exact: true }).hover();

    await expect.element(rootLocator).not.toHaveAttribute('data-paused');
    await expect.element(content).toHaveCSS('animation-play-state', 'running');
    await expect.poll(() => component.getState().paused).toBe(false);
    await expect
      .poll(() => [...component.getState().pauseChanges])
      .toEqual([{ paused: true }, { paused: false }]);
  } finally {
    outside.remove();
  }
});

test('preserves the root host element with asChild', async () => {
  render(AsChildMarquee);

  const root = screen.getByRole('region', { name: 'Partner logos' });

  expect(root.tagName).toBe('A');
  const rootLocator = page.getByRole('region', { name: 'Partner logos', exact: true });
  await expect.element(rootLocator).toHaveAttribute('href', '/partners');
  await expect.element(rootLocator).toHaveAttribute('data-slot', 'marquee-root');
  await expect.element(rootLocator).toHaveAttribute('data-scope', 'marquee');
});

test('styles a RootProvider tree created by the public hook', async () => {
  const pauseChanges: Array<{ paused: boolean }> = [];
  render(ProviderMarquee, { props: { onPauseChange: (details) => pauseChanges.push(details) } });

  await expect
    .element(page.getByRole('region', { name: 'Partner logos', exact: true }))
    .toHaveAttribute('data-slot', 'marquee-root-provider');
  await page.getByRole('button', { name: 'Pause marquee', exact: true }).click();
  await expect
    .element(page.getByRole('region', { name: 'Partner logos', exact: true }))
    .toHaveAttribute('data-paused');
  expect(pauseChanges).toEqual([{ paused: true }]);
});