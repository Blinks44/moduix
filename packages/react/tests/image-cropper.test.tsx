import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
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
  const selectionRef = createRef<HTMLDivElement>();
  const { container } = render(
    <ImageCropper>
      <ImageCropper.Viewport>
        <ImageCropper.Image src="/landscape.jpg" />
        <ImageCropper.CropArea ref={selectionRef} />
      </ImageCropper.Viewport>
    </ImageCropper>,
  );

  expect(selectionRef.current).toHaveAttribute('data-slot', 'image-cropper-selection');
  expect(container.querySelectorAll('[data-slot="image-cropper-grid"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-slot="image-cropper-handle"]')).toHaveLength(
    ImageCropper.handles.length,
  );
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