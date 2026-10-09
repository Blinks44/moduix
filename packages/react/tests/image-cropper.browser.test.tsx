import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createElement, createRef } from 'react';
import {
  ImageCropper,
  ImageCropperCropArea,
  ImageCropperHandles,
  ImageCropperImage,
  ImageCropperRootProvider,
  ImageCropperViewport,
  useImageCropper,
} from '../src';
import landscape from './fixtures/landscape.svg';

test('renders the recommended CropArea anatomy with moduix hooks', async () => {
  const rootRef = createRef<HTMLDivElement>();
  const selectionRef = createRef<HTMLDivElement>();
  const { container } = render(
    <ImageCropper ref={rootRef} aria-label="Landscape crop">
      <ImageCropperViewport>
        <ImageCropperImage src={landscape} />
        <ImageCropperCropArea ref={selectionRef} />
      </ImageCropperViewport>
    </ImageCropper>,
  );

  expect(rootRef.current).toBe(screen.getByRole('group', { name: 'Landscape crop' }));
  expect(rootRef.current!.getAttribute('data-slot')).toBe('image-cropper-root');
  expect(selectionRef.current!.getAttribute('data-slot')).toBe('image-cropper-selection');
  expect(selectionRef.current).toBe(screen.getByRole('slider', { hidden: true }));
  expect(selectionRef.current!.getAttribute('tabindex')).toBe('0');
  expect(container.querySelectorAll('[data-slot="image-cropper-grid"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-slot="image-cropper-handle"]')).toHaveLength(
    ImageCropperHandles.length,
  );
});

test('preserves Ark keyboard crop commands after the image is ready', async () => {
  render(
    <ImageCropper aria-label="Landscape crop">
      <ImageCropperViewport>
        <ImageCropperImage src={landscape} />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>,
  );
  const selection = screen.getByRole('slider', { hidden: true });

  await expect
    .element(page.locator('[data-slot="image-cropper-image"]'))
    .toHaveAttribute('data-ready');

  const before = selection.getAttribute('aria-valuenow');
  await page.getByRole('slider').press('ArrowLeft');
  await expect.element(page.getByRole('slider')).not.toHaveAttribute('aria-valuenow', before!);
});

test('preserves fixed crop area semantics', async () => {
  const { container } = render(
    <ImageCropper fixedCropArea aria-label="Avatar crop">
      <ImageCropperViewport>
        <ImageCropperImage src={landscape} />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>,
  );

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

function ProviderImageCropper() {
  const imageCropper = useImageCropper({ aspectRatio: 16 / 9 });

  return (
    <ImageCropperRootProvider value={imageCropper} data-testid="image-cropper-provider">
      <ImageCropperViewport>
        <ImageCropperImage src={landscape} />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropperRootProvider>
  );
}

test('supports RootProvider with the recommended CropArea anatomy', async () => {
  const { getByTestId } = render(<ProviderImageCropper />);

  expect(getByTestId('image-cropper-provider')!.getAttribute('data-slot')).toBe(
    'image-cropper-root-provider',
  );
});

test('does not forward unsupported CropArea composition props to Ark', async () => {
  const { container } = render(
    <ImageCropper>
      <ImageCropperViewport>
        <ImageCropperImage src={landscape} />
        {createElement(ImageCropperCropArea, { asChild: true, children: <div /> } as never)}
      </ImageCropperViewport>
    </ImageCropper>,
  );

  expect(container.querySelector('[data-slot="image-cropper-selection"]')).toBeTruthy();
  expect(container.querySelectorAll('[data-slot="image-cropper-handle"]')).toHaveLength(
    ImageCropperHandles.length,
  );
});