import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import { ImageCropperHandles } from '@/index';
import AnatomyCropper from './image-cropper/AnatomyCropper.svelte';
import AsChildCropper from './image-cropper/AsChildCropper.svelte';
import AttrsCropper from './image-cropper/AttrsCropper.svelte';
import BasicCropper from './image-cropper/BasicCropper.svelte';
import ProviderCropper from './image-cropper/ProviderCropper.svelte';
import ZoomCropper from './image-cropper/ZoomCropper.svelte';

const portrait = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="400"></svg>',
)}`;

test('renders the recommended CropArea anatomy with refs, attrs, and styles', async () => {
  const { component, container } = render(AnatomyCropper);
  const { imageRef, rootRef, selectionRef, viewportRef } = component.getRefs();

  expect(rootRef).toBe(screen.getByRole('group', { name: 'Landscape crop' }));
  expect(rootRef!.getAttribute('data-slot')).toBe('image-cropper-root');
  expect(rootRef!.getAttribute('data-probe')).toBe('root');
  expect(viewportRef!.getAttribute('data-slot')).toBe('image-cropper-viewport');
  expect(imageRef!.getAttribute('data-slot')).toBe('image-cropper-image');
  expect(selectionRef!.getAttribute('data-slot')).toBe('image-cropper-selection');
  expect(selectionRef).toBe(screen.getByRole('slider', { hidden: true }));
  expect(selectionRef!.getAttribute('tabindex')).toBe('0');
  expect(container.querySelectorAll('[data-slot="image-cropper-grid"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-slot="image-cropper-handle"]')).toHaveLength(
    ImageCropperHandles.length,
  );
});

test('updates and removes CropArea attrs and listeners without replacing its host', async () => {
  const firstClick = rs.fn();
  const nextClick = rs.fn();
  const { component, container, rerender } = render(AttrsCropper, {
    props: {
      selectionAttrs: {
        title: 'First selection',
        'aria-label': 'First crop',
        'data-probe': 'first',
        style: 'color: red',
        onclick: firstClick,
      },
    },
  });
  const selection = screen.getByTitle('First selection');
  await page.locator('[data-slot="image-cropper-selection"]').click();
  expect(firstClick).toHaveBeenCalledTimes(1);

  await rerender({
    selectionAttrs: {
      title: 'Next selection',
      'aria-label': 'Next crop',
      'data-probe': 'next',
      style: 'color: blue',
      onclick: nextClick,
    },
  });
  expect(screen.getByTitle('Next selection')).toBe(selection);
  expect(component.getRefs().selectionRef).toBe(selection);
  await expect
    .element(page.locator('[data-slot="image-cropper-selection"]'))
    .toHaveAttribute('aria-label', 'Next crop');
  await expect
    .element(page.locator('[data-slot="image-cropper-selection"]'))
    .toHaveAttribute('data-probe', 'next');
  await expect
    .element(page.locator('[data-slot="image-cropper-selection"]'))
    .toHaveCSS('color', 'rgb(0, 0, 255)');
  expect(container.querySelectorAll('[data-slot="image-cropper-grid"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-slot="image-cropper-handle"]')).toHaveLength(
    ImageCropperHandles.length,
  );
  await page.locator('[data-slot="image-cropper-selection"]').click();
  expect(firstClick).toHaveBeenCalledTimes(1);
  expect(nextClick).toHaveBeenCalledTimes(1);

  await rerender({ selectionAttrs: {} });
  await expect
    .element(page.locator('[data-slot="image-cropper-selection"]'))
    .not.toHaveAttribute('title');
  await expect
    .element(page.locator('[data-slot="image-cropper-selection"]'))
    .not.toHaveAttribute('data-probe');
  expect(selection.style.color).toBe('');
  await page.locator('[data-slot="image-cropper-selection"]').click();
  expect(firstClick).toHaveBeenCalledTimes(1);
  expect(nextClick).toHaveBeenCalledTimes(1);
});

test('preserves root asChild composition and exposes its semantic host through a Svelte ref', async () => {
  const { component } = render(AsChildCropper);

  const root = screen.getByRole('group', { name: 'Landscape crop' });
  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('group', { name: 'Landscape crop', exact: true }))
    .toHaveAttribute('data-slot', 'image-cropper-root');
  expect(component.getRefs().rootRef).toBe(root);
});

test('preserves Ark keyboard crop commands after the image is ready', async () => {
  render(BasicCropper, { props: { 'aria-label': 'Landscape crop' } });
  const selection = screen.getByRole('slider', { hidden: true });

  await expect
    .element(page.locator('[data-slot="image-cropper-image"]'))
    .toHaveAttribute('data-ready');
  const before = selection.getAttribute('aria-valuenow');
  await page.getByRole('slider').press('ArrowLeft');
  await expect.element(page.getByRole('slider')).not.toHaveAttribute('aria-valuenow', before!);
});

test('preserves fixed crop area semantics', async () => {
  const { container } = render(BasicCropper, {
    props: { fixedCropArea: true, 'aria-label': 'Avatar crop' },
  });

  await expect
    .element(page.getByRole('group', { name: 'Avatar crop', exact: true }))
    .toHaveAttribute('data-fixed');
  await expect
    .element(page.getByRole('slider', { includeHidden: true, exact: true }))
    .not.toHaveAttribute('aria-disabled');
  await expect
    .element(page.getByRole('slider', { includeHidden: true, exact: true }))
    .toHaveAttribute('data-disabled');
  await expect
    .element(page.getByRole('slider', { includeHidden: true, exact: true }))
    .toHaveAttribute('tabindex', '0');
  await expect
    .element(page.locator('[data-slot="image-cropper-viewport"]'))
    .toHaveAttribute('data-disabled');
  expect(
    container.querySelectorAll('[data-slot="image-cropper-handle"][data-disabled]'),
  ).toHaveLength(ImageCropperHandles.length);
});

test('forwards RootProvider and preserves its public hook contract', async () => {
  render(ProviderCropper);

  await expect
    .element(page.getByTestId('image-cropper-provider'))
    .toHaveAttribute('data-slot', 'image-cropper-root-provider');
});

test('keeps the image ratio inside a viewport sized by its container', async () => {
  const { container } = render(BasicCropper, { props: { src: portrait, width: '300px' } });

  await expect
    .element(page.locator('[data-slot="image-cropper-image"]'))
    .toHaveAttribute('data-ready');
  const viewport = container.querySelector<HTMLElement>('[data-slot="image-cropper-viewport"]')!;
  const image = container.querySelector<HTMLElement>('[data-slot="image-cropper-image"]')!;

  expect(viewport.offsetWidth).toBe(300);
  expect(Math.abs(viewport.offsetHeight - (300 * 5) / 8)).toBeLessThanOrEqual(1);
  expect(image.offsetHeight).toBe(viewport.clientHeight);
  expect(Math.abs(image.offsetWidth * 2 - image.offsetHeight)).toBeLessThanOrEqual(1);
  expect(
    Math.abs(image.offsetLeft * 2 + image.offsetWidth - viewport.clientWidth),
  ).toBeLessThanOrEqual(1);
});

test('forwards native Svelte bind:zoom and Ark event details', async () => {
  const { component } = render(ZoomCropper);

  await expect
    .element(page.locator('[data-slot="image-cropper-image"]'))
    .toHaveAttribute('data-ready');
  await page.getByRole('button', { name: 'Zoom', exact: true }).click();

  await expect.poll(() => component.getZoomChanges().at(-1)).toBe(1.1);
  await expect.element(page.getByText('1.1')).toBeAttached();
});