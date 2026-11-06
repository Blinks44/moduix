import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import { resolveRootNode } from '@/components/lightbox/lightbox';
import BindImageLightbox from './lightbox/BindImageLightbox.svelte';
import BoundLightbox from './lightbox/BoundLightbox.svelte';
import ClickLightbox from './lightbox/ClickLightbox.svelte';
import CloseIconLightbox from './lightbox/CloseIconLightbox.svelte';
import CloseIconReactiveLightbox from './lightbox/CloseIconReactiveLightbox.svelte';
import ComposedTriggerLightbox from './lightbox/ComposedTriggerLightbox.svelte';
import MarkerLightbox from './lightbox/MarkerLightbox.svelte';
import ProviderLightbox from './lightbox/ProviderLightbox.svelte';
import RefsLightbox from './lightbox/RefsLightbox.svelte';

test('resolves Bind elements, getters, and selector fallbacks', () => {
  const root = document.createElement('section');
  root.id = 'bind-root';
  document.body.append(root);
  try {
    const otherRoot = document.createElement('section');
    let current: HTMLElement | null = root;
    const getRoot = rs.fn(() => current);

    expect(resolveRootNode(root, '#missing-root')).toBe(root);
    expect(resolveRootNode(getRoot, '#missing-root')).toBe(root);
    expect(getRoot).toHaveBeenCalledTimes(1);

    current = otherRoot;
    expect(resolveRootNode(getRoot, '#bind-root')).toBe(otherRoot);
    expect(getRoot).toHaveBeenCalledTimes(2);

    current = null;
    expect(resolveRootNode(getRoot, '#bind-root')).toBe(root);
    expect(getRoot).toHaveBeenCalledTimes(3);
    expect(resolveRootNode(undefined, '#bind-root')).toBe(root);
    expect(resolveRootNode(() => undefined, '#bind-root')).toBe(root);
    expect(resolveRootNode(undefined, '#missing-root')).toBeNull();
    expect(resolveRootNode(undefined, undefined)).toBeNull();
  } finally {
    root.remove();
  }
});

test('opens from a semantic Bind selector', async () => {
  render(BoundLightbox);
  screen.getByRole('button').addEventListener('click', (event) => event.preventDefault(), {
    once: true,
  });
  await page.getByRole('button').click();
  await expect.element(page.getByRole('dialog')).toHaveCount(0);

  await page.getByRole('button').click();

  await expect
    .element(page.getByRole('dialog', { name: 'Image preview', exact: true }))
    .toBeAttached();
  await expect
    .element(
      page
        .getByRole('dialog', { name: 'Image preview', exact: true })
        .getByRole('img', { name: 'Mountain ridge' }),
    )
    .toHaveAttribute('src', '/full-size.jpg');
});

test('keeps the lightbox open when an image click is prevented', async () => {
  render(ClickLightbox, { props: { defaultOpen: true, withPrevent: true } });

  await page.getByRole('img', { name: 'Mountain ridge', exact: true }).click();
  await expect
    .element(page.getByRole('dialog', { name: 'Image preview', exact: true }))
    .toBeAttached();
});

test.each([false, true])(
  'runs the image click listener before click-to-close (cancel=%s)',
  async (cancel) => {
    const calls: string[] = [];
    render(ClickLightbox, { props: { calls, cancel } });
    await page.getByRole('button', { name: 'Open preview', exact: true }).click();
    await page.getByRole('img', { name: 'Mountain ridge', exact: true }).click();
    expect(calls).toEqual(['first']);
    if (cancel)
      await expect.element(page.getByRole('dialog', { name: 'Image preview' })).toBeVisible();
    else await expect.element(page.getByRole('dialog')).toHaveCount(0);
  },
);

test('lazily mounts, closes a click-to-close image, and restores focus', async () => {
  render(ClickLightbox);

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Open preview', exact: true }).click();
  await page.getByRole('img', { name: 'Mountain ridge', exact: true }).click();

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect
    .element(page.getByRole('button', { name: 'Open preview', exact: true }))
    .toBeFocused();
});

test('keeps its close icon accessible and viewport-fixed, then restores trigger focus', async () => {
  render(CloseIconLightbox);

  await page.getByRole('button', { name: 'Open preview', exact: true }).click();
  const closeIcon = page.getByRole('button', { name: 'Close image', exact: true });
  await expect.element(closeIcon).toBeFocused();
  await expect.element(closeIcon).toBeVisible();
  const dialog = screen.getByRole('dialog', { name: 'Image preview' });
  const button = screen.getByRole('button', { name: 'Close image' });
  expect(dialog.contains(button)).toBe(true);
  const rect = button.getBoundingClientRect();
  expect(rect.top).toBeCloseTo(16);
  expect(window.innerWidth - rect.right).toBeCloseTo(16);
  await closeIcon.press('Tab');
  await expect.element(closeIcon).toBeFocused();
  await closeIcon.click();

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect
    .element(page.getByRole('button', { name: 'Open preview', exact: true }))
    .toBeFocused();
});

test('exposes RootProvider state through useLightboxContext', async () => {
  render(ProviderLightbox);
  await page.getByRole('button', { name: 'Open preview', exact: true }).click();

  await expect
    .element(page.getByRole('dialog', { name: 'Image preview', exact: true }))
    .toBeAttached();
  await expect.element(page.getByText('Open: true')).toBeAttached();
});

test('forwards refs through native parts and keeps asChild composition native', async () => {
  const { component } = render(RefsLightbox);
  const refs = component.getRefs();
  for (const [name, element] of Object.entries(refs)) {
    const slotName =
      name === 'closeIcon' ? 'close-icon' : name === 'closeTrigger' ? 'close-trigger' : name;
    expect(element?.getAttribute('data-slot')).toBe('lightbox-' + slotName);
  }

  const composed = render(ComposedTriggerLightbox);
  const composedTrigger = document.querySelector('a[href="/preview"]')!;
  await expect
    .element(page.locator('a[href="/preview"]'))
    .toHaveAttribute('data-slot', 'lightbox-trigger');
  expect(composed.component.getComposed()).toBe(composedTrigger);
});

test('keeps the close-on-click marker aligned with its behavior', async () => {
  render(MarkerLightbox);

  await expect.element(page.locator('img[alt="Closes"]')).toHaveAttribute('data-close-on-click');
  await expect
    .element(page.locator('img[alt="Stays open"]'))
    .not.toHaveAttribute('data-close-on-click');
});

test.each([
  { name: 'empty currentSrc', currentSrc: '', override: undefined, selected: 'fallback' },
  {
    name: 'responsive source',
    currentSrc: '/responsive.jpg',
    override: undefined,
    selected: '/responsive.jpg',
  },
  {
    name: 'source override',
    currentSrc: '/responsive.jpg',
    override: '/full.jpg',
    selected: '/full.jpg',
  },
  { name: 'explicit empty override', currentSrc: '/responsive.jpg', override: '', selected: null },
])('resolves bound images with $name', async ({ currentSrc, override, selected }) => {
  const onImageSelect = rs.fn();
  render(BindImageLightbox, { props: { onImageSelect } });
  const image = screen.getByRole('img', { name: 'Bound image' }) as HTMLImageElement;
  Object.defineProperty(image, 'currentSrc', { configurable: true, value: currentSrc });
  if (override !== undefined) image.dataset.lightboxSrc = override;
  await page.getByRole('img', { name: 'Bound image', exact: true }).click();
  if (selected === null) {
    expect(onImageSelect).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).toBeNull();
  } else {
    expect(onImageSelect).toHaveBeenCalledExactlyOnceWith({
      src: selected === 'fallback' ? image.src : selected,
      alt: image.alt,
      element: image,
    });
    await expect
      .element(page.getByRole('dialog', { name: 'Bound preview', exact: true }))
      .toBeVisible();
  }
});

test('keeps close-icon labels, attrs and fallback content reactive', async () => {
  const { rerender } = render(CloseIconReactiveLightbox, { props: { label: 'Dismiss first' } });
  const button = await screen.findByTestId('close');
  expect(button.tagName).toBe('BUTTON');
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', 'Dismiss first');
  expect([...button.classList]).toEqual(expect.arrayContaining(['consumer-close']));
  await expect.element(page.getByTestId('close')).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect.element(page.getByTestId('close')).toHaveAttribute('title', 'Dismiss preview');
  expect(Boolean(button.querySelector('svg')?.isConnected)).toBe(true);
  await rerender({ label: 'Dismiss second' });
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', 'Dismiss second');
  await rerender({ label: undefined, labelledby: 'dismiss-label' });
  await expect
    .element(page.getByTestId('close'))
    .toHaveAttribute('aria-labelledby', 'dismiss-label');
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', 'Close image');
  await rerender({ label: '', labelledby: 'dismiss-label' });
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', '');
  await rerender({ label: '', labelledby: 'dismiss-label', custom: true });
  await expect.element(page.getByTestId('close')).toContainText('Custom close');
  expect(screen.getByTestId('close').querySelector('svg')).toBeNull();
  await rerender({ label: '', labelledby: 'dismiss-label', custom: false });
  await expect
    .poll(() => Boolean(screen.getByTestId('close').querySelector('svg')?.isConnected))
    .toBe(true);
});