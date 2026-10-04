import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  ImageCropper,
  ImageCropperCropArea,
  ImageCropperHandles,
  ImageCropperImage,
  ImageCropperRootProvider,
  ImageCropperViewport,
  useImageCropper,
} from '../src';

type CropAreaProps = InstanceType<typeof ImageCropperCropArea>['$props'];

const cropAreaDoesNotExposeCompositionProps: Extract<
  keyof CropAreaProps,
  'asChild' | 'children'
> extends never
  ? true
  : false = true;

const imageCropperComponents = {
  ImageCropper,
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperRootProvider,
  ImageCropperViewport,
};

test('does not expose unsupported CropArea composition props', () => {
  expect(cropAreaDoesNotExposeCompositionProps).toBe(true);
});

test('renders the recommended CropArea anatomy with refs, attrs, and consumer classes last', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const selectionRef = ref<ComponentPublicInstance>();
  const { container } = render(
    defineComponent({
      components: imageCropperComponents,
      setup() {
        return { rootRef, selectionRef };
      },
      template: `
        <ImageCropper ref="rootRef" aria-label="Landscape crop" data-probe="root" class="consumer-root">
          <ImageCropperViewport class="consumer-viewport">
            <ImageCropperImage src="/landscape.jpg" />
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
  expect(root).toHaveAttribute('data-slot', 'image-cropper-root');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(root).toHaveClass('consumer-root');
  expect(viewport).toHaveClass('consumer-viewport');
  expect(selection).toHaveAttribute('data-slot', 'image-cropper-selection');
  expect(selection).toBe(screen.getByRole('slider', { hidden: true }));
  expect(selection).toHaveAttribute('tabindex', '0');
  expect(selection).toHaveClass('consumer-selection');
  expect(container.querySelectorAll('[data-slot="image-cropper-grid"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-slot="image-cropper-handle"]')).toHaveLength(
    ImageCropperHandles.length,
  );
});

test('updates and removes CropArea attrs and listeners without replacing its host', async () => {
  const selectionRef = ref<ComponentPublicInstance>();
  const firstClick = rs.fn();
  const nextClick = rs.fn();
  const Harness = defineComponent({
    components: imageCropperComponents,
    props: ['selectionAttrs'],
    setup: () => ({ selectionRef }),
    template: `
      <ImageCropper>
        <ImageCropperViewport>
          <ImageCropperImage src="/landscape.jpg" />
          <ImageCropperCropArea ref="selectionRef" v-bind="selectionAttrs" />
        </ImageCropperViewport>
      </ImageCropper>
    `,
  });
  const { container, rerender } = render(Harness, {
    props: {
      selectionAttrs: {
        title: 'First selection',
        'aria-label': 'First crop',
        'data-probe': 'first',
        style: { color: 'red' },
        onClick: firstClick,
      },
    },
  });
  const selection = screen.getByTitle('First selection');
  await fireEvent.click(selection);
  expect(firstClick).toHaveBeenCalledTimes(1);

  await rerender({
    selectionAttrs: {
      title: 'Next selection',
      'aria-label': 'Next crop',
      'data-probe': 'next',
      style: { color: 'blue' },
      onClick: nextClick,
      asChild: true,
      'as-child': true,
      children: 'Unsupported content',
    },
  });
  expect(screen.getByTitle('Next selection')).toBe(selection);
  expect(selectionRef.value?.$el).toBe(selection);
  expect(selection).toHaveAttribute('aria-label', 'Next crop');
  expect(selection).toHaveAttribute('data-probe', 'next');
  expect(selection).toHaveStyle({ color: 'blue' });
  expect(selection).not.toHaveAttribute('children');
  expect(container.querySelectorAll('[data-slot="image-cropper-grid"]')).toHaveLength(2);
  expect(container.querySelectorAll('[data-slot="image-cropper-handle"]')).toHaveLength(
    ImageCropperHandles.length,
  );
  await fireEvent.click(selection);
  expect(firstClick).toHaveBeenCalledTimes(1);
  expect(nextClick).toHaveBeenCalledTimes(1);

  await rerender({ selectionAttrs: {} });
  expect(selection).not.toHaveAttribute('title');
  expect(selection).not.toHaveAttribute('data-probe');
  expect(selection.style.color).toBe('');
  await fireEvent.click(selection);
  expect(firstClick).toHaveBeenCalledTimes(1);
  expect(nextClick).toHaveBeenCalledTimes(1);
});

test('preserves root asChild composition and exposes its semantic host through a Vue ref', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: imageCropperComponents,
    setup() {
      return { rootRef };
    },
    template: `
      <ImageCropper ref="rootRef" as-child>
        <section aria-label="Landscape crop">
          <ImageCropperViewport>
            <ImageCropperImage src="/landscape.jpg" />
            <ImageCropperCropArea />
          </ImageCropperViewport>
        </section>
      </ImageCropper>
    `,
  });

  render(Harness);

  const root = screen.getByRole('group', { name: 'Landscape crop' });
  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'image-cropper-root');
  expect(rootRef.value?.$el).toBe(root);
});

test('preserves Ark keyboard crop commands after the image is ready', async () => {
  const { container } = render(
    defineComponent({
      components: imageCropperComponents,
      template: `
        <ImageCropper aria-label="Landscape crop">
          <ImageCropperViewport>
            <ImageCropperImage src="/landscape.jpg" />
            <ImageCropperCropArea />
          </ImageCropperViewport>
        </ImageCropper>
      `,
    }),
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
  await fireEvent.keyDown(selection, { key: 'ArrowLeft' });
});

// Ark UI Vue 5.39.2 does not pass ImageCropperRoot props to useImageCropper.
test.skip('preserves fixed crop area semantics (blocked by upstream Ark UI Vue)', () => {
  const { container } = render(
    defineComponent({
      components: imageCropperComponents,
      template: `
        <ImageCropper fixed-crop-area aria-label="Avatar crop">
          <ImageCropperViewport>
            <ImageCropperImage src="/avatar.jpg" />
            <ImageCropperCropArea />
          </ImageCropperViewport>
        </ImageCropper>
      `,
    }),
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

test('supports RootProvider with the recommended CropArea anatomy', () => {
  const ProviderImageCropper = defineComponent({
    components: imageCropperComponents,
    setup() {
      return { imageCropper: useImageCropper({ aspectRatio: 16 / 9 }) };
    },
    template: `
      <ImageCropperRootProvider :value="imageCropper" data-testid="image-cropper-provider">
        <ImageCropperViewport>
          <ImageCropperImage src="/landscape.jpg" />
          <ImageCropperCropArea />
        </ImageCropperViewport>
      </ImageCropperRootProvider>
    `,
  });

  render(ProviderImageCropper);

  expect(screen.getByTestId('image-cropper-provider')).toHaveAttribute(
    'data-slot',
    'image-cropper-root-provider',
  );
});

test('does not forward unsupported CropArea composition props to Ark', () => {
  const { container } = render(
    defineComponent({
      components: imageCropperComponents,
      template: `
        <ImageCropper>
          <ImageCropperViewport>
            <ImageCropperImage src="/landscape.jpg" />
            <ImageCropperCropArea as-child><section>Unsupported child</section></ImageCropperCropArea>
          </ImageCropperViewport>
        </ImageCropper>
      `,
    }),
  );

  expect(container.querySelector('[data-slot="image-cropper-selection"]')).toBeTruthy();
  expect(container.querySelector('section')).toBeNull();
  expect(container.querySelectorAll('[data-slot="image-cropper-handle"]')).toHaveLength(
    ImageCropperHandles.length,
  );
});

test('renders on the server and hydrates without losing anatomy', async () => {
  const App = defineComponent({
    components: imageCropperComponents,
    template: `
      <ImageCropper aria-label="SSR crop">
        <ImageCropperViewport>
          <ImageCropperImage src="/landscape.jpg" />
          <ImageCropperCropArea />
        </ImageCropperViewport>
      </ImageCropper>
    `,
  });
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(App));
  const app = createSSRApp(App);

  expect(host.querySelector('[data-slot="image-cropper-root"]')).toBeTruthy();
  expect(() => app.mount(host)).not.toThrow();
  expect(host.querySelector('[data-slot="image-cropper-selection"]')).toBeTruthy();
  app.unmount();
});