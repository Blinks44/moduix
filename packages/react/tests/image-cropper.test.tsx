import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ComponentProps } from 'react';
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

type CropAreaProps = ComponentProps<typeof ImageCropperCropArea>;

const cropAreaDoesNotExposeCompositionProps: Extract<
  keyof CropAreaProps,
  'asChild' | 'children'
> extends never
  ? true
  : false = true;

test('does not expose unsupported CropArea composition props', () => {
  expect(cropAreaDoesNotExposeCompositionProps).toBe(true);
});

test('renders the recommended CropArea anatomy with moduix hooks', () => {
  const rootRef = createRef<HTMLDivElement>();
  const selectionRef = createRef<HTMLDivElement>();
  const { container } = render(
    <ImageCropper ref={rootRef} aria-label="Landscape crop">
      <ImageCropperViewport>
        <ImageCropperImage src="/landscape.jpg" />
        <ImageCropperCropArea ref={selectionRef} />
      </ImageCropperViewport>
    </ImageCropper>,
  );

  expect(rootRef.current).toBe(screen.getByRole('group', { name: 'Landscape crop' }));
  expect(rootRef.current).toHaveAttribute('data-slot', 'image-cropper-root');
  expect(selectionRef.current).toHaveAttribute('data-slot', 'image-cropper-selection');
  expect(selectionRef.current).toBe(screen.getByRole('slider', { hidden: true }));
  expect(selectionRef.current).toHaveAttribute('tabindex', '0');
  expect(container.querySelectorAll('[data-slot="image-cropper-grid"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-slot="image-cropper-handle"]')).toHaveLength(
    ImageCropperHandles.length,
  );
});

test('preserves Ark keyboard crop commands after the image is ready', async () => {
  const { container } = render(
    <ImageCropper aria-label="Landscape crop">
      <ImageCropperViewport>
        <ImageCropperImage src="/landscape.jpg" />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>,
  );
  const image = container.querySelector<HTMLImageElement>('[data-slot="image-cropper-image"]')!;
  const selection = screen.getByRole('slider', { hidden: true });

  Object.defineProperties(image, {
    complete: { configurable: true, value: true },
    naturalHeight: { configurable: true, value: 400 },
    naturalWidth: { configurable: true, value: 640 },
  });

  fireEvent.load(image);

  await waitFor(() => expect(image).toHaveAttribute('data-ready'));

  expect(fireEvent.keyDown(selection, { key: 'ArrowLeft' })).toBe(false);
});

test('preserves fixed crop area semantics', () => {
  const { container } = render(
    <ImageCropper fixedCropArea aria-label="Avatar crop">
      <ImageCropperViewport>
        <ImageCropperImage src="/avatar.jpg" />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>,
  );
  const root = screen.getByRole('group', { name: 'Avatar crop' });
  const selection = screen.getByRole('slider', { hidden: true });
  const viewport = container.querySelector('[data-slot="image-cropper-viewport"]');

  expect(root).toHaveAttribute('data-fixed');
  expect(selection).not.toHaveAttribute('aria-disabled');
  expect(selection).toHaveAttribute('data-disabled');
  expect(selection).toHaveAttribute('tabindex', '0');
  expect(viewport).toHaveAttribute('data-disabled');
  expect(
    container.querySelectorAll('[data-slot="image-cropper-handle"][data-disabled]'),
  ).toHaveLength(ImageCropperHandles.length);
});

function ProviderImageCropper() {
  const imageCropper = useImageCropper({ aspectRatio: 16 / 9 });

  return (
    <ImageCropperRootProvider value={imageCropper} data-testid="image-cropper-provider">
      <ImageCropperViewport>
        <ImageCropperImage src="/landscape.jpg" />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropperRootProvider>
  );
}

test('supports RootProvider with the recommended CropArea anatomy', () => {
  const { getByTestId } = render(<ProviderImageCropper />);

  expect(getByTestId('image-cropper-provider')).toHaveAttribute(
    'data-slot',
    'image-cropper-root-provider',
  );
});

test('does not forward unsupported CropArea composition props to Ark', () => {
  const { container } = render(
    <ImageCropper>
      <ImageCropperViewport>
        <ImageCropperImage src="/landscape.jpg" />
        {createElement(ImageCropperCropArea, { asChild: true, children: <div /> } as never)}
      </ImageCropperViewport>
    </ImageCropper>,
  );

  expect(container.querySelector('[data-slot="image-cropper-selection"]')).toBeTruthy();
  expect(container.querySelectorAll('[data-slot="image-cropper-handle"]')).toHaveLength(
    ImageCropperHandles.length,
  );
});