import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { createElement, createRef } from 'react';
import { ImageCropper, useImageCropper } from '../src';

type CropAreaProps = ComponentProps<typeof ImageCropper.CropArea>;

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
      <ImageCropper.Viewport>
        <ImageCropper.Image src="/landscape.jpg" />
        <ImageCropper.CropArea ref={selectionRef} />
      </ImageCropper.Viewport>
    </ImageCropper>,
  );

  expect(rootRef.current).toBe(screen.getByRole('group', { name: 'Landscape crop' }));
  expect(rootRef.current).toHaveAttribute('data-slot', 'image-cropper-root');
  expect(selectionRef.current).toHaveAttribute('data-slot', 'image-cropper-selection');
  expect(selectionRef.current).toBe(screen.getByRole('slider', { hidden: true }));
  expect(selectionRef.current).toHaveAttribute('tabindex', '0');
  expect(container.querySelectorAll('[data-slot="image-cropper-grid"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-slot="image-cropper-handle"]')).toHaveLength(
    ImageCropper.handles.length,
  );
});

test('preserves Ark keyboard crop commands after the image is ready', async () => {
  const { container } = render(
    <ImageCropper aria-label="Landscape crop">
      <ImageCropper.Viewport>
        <ImageCropper.Image src="/landscape.jpg" />
        <ImageCropper.CropArea />
      </ImageCropper.Viewport>
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
      <ImageCropper.Viewport>
        <ImageCropper.Image src="/avatar.jpg" />
        <ImageCropper.CropArea />
      </ImageCropper.Viewport>
    </ImageCropper>,
  );
  const root = screen.getByRole('group', { name: 'Avatar crop' });
  const selection = screen.getByRole('slider', { hidden: true });
  const viewport = container.querySelector('[data-slot="image-cropper-viewport"]');

  expect(root).toHaveAttribute('data-fixed');
  expect(selection).toHaveAttribute('aria-disabled', 'true');
  expect(selection).toHaveAttribute('data-disabled');
  expect(selection).not.toHaveAttribute('tabindex');
  expect(viewport).toHaveAttribute('data-disabled');
  expect(
    container.querySelectorAll('[data-slot="image-cropper-handle"][data-disabled]'),
  ).toHaveLength(ImageCropper.handles.length);
});

function ProviderImageCropper() {
  const imageCropper = useImageCropper({ aspectRatio: 16 / 9 });

  return (
    <ImageCropper.RootProvider value={imageCropper} data-testid="image-cropper-provider">
      <ImageCropper.Viewport>
        <ImageCropper.Image src="/landscape.jpg" />
        <ImageCropper.CropArea />
      </ImageCropper.Viewport>
    </ImageCropper.RootProvider>
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
      <ImageCropper.Viewport>
        <ImageCropper.Image src="/landscape.jpg" />
        {createElement(ImageCropper.CropArea, { asChild: true, children: <div /> } as never)}
      </ImageCropper.Viewport>
    </ImageCropper>,
  );

  expect(container.querySelector('[data-slot="image-cropper-selection"]')).toBeTruthy();
  expect(container.querySelectorAll('[data-slot="image-cropper-handle"]')).toHaveLength(
    ImageCropper.handles.length,
  );
});