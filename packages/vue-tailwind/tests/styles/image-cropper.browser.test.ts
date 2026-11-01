import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  ImageCropper,
  ImageCropperCropArea,
  ImageCropperHandles,
  ImageCropperImage,
  ImageCropperRootProvider,
  ImageCropperViewport,
  ImageCropperContext,
} from '@/index';
import landscape from '../fixtures/landscape.svg';

const imageCropperComponents = {
  ImageCropper,
  ImageCropperContext,
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperRootProvider,
  ImageCropperViewport,
};

test('renders the recommended CropArea anatomy with refs, attrs, and consumer classes last', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const selectionRef = ref<ComponentPublicInstance>();
  const { container } = render(
    defineComponent({
      components: imageCropperComponents,
      setup() {
        return { landscape, rootRef, selectionRef };
      },
      template: `
        <ImageCropper ref="rootRef" aria-label="Landscape crop" data-probe="root" class="consumer-root">
          <ImageCropperViewport class="consumer-viewport">
            <ImageCropperImage :src="landscape" />
            <ImageCropperCropArea ref="selectionRef" class="consumer-selection" />
          </ImageCropperViewport>
        </ImageCropper>
      `,
    }),
  );

  const root = rootRef.value?.$el as HTMLElement;
  const selection = selectionRef.value?.$el as HTMLElement;
  const viewport = container.querySelector('[data-slot="image-cropper-viewport"]')!;

  expect(root).toBe(screen.getByRole('group', { name: 'Landscape crop' }));
  expect(root!.getAttribute('data-slot')).toBe('image-cropper-root');
  expect(root!.getAttribute('data-probe')).toBe('root');
  expect([...root!.classList]).toEqual(expect.arrayContaining(['consumer-root']));
  expect([...viewport!.classList]).toEqual(expect.arrayContaining(['consumer-viewport']));
  expect(selection!.getAttribute('data-slot')).toBe('image-cropper-selection');
  expect(selection).toBe(screen.getByRole('slider', { hidden: true }));
  expect(selection!.getAttribute('tabindex')).toBe('0');
  expect([...selection!.classList]).toEqual(expect.arrayContaining(['consumer-selection']));
  expect(container.querySelectorAll('[data-slot="image-cropper-grid"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-slot="image-cropper-handle"]')).toHaveLength(
    ImageCropperHandles.length,
  );
});