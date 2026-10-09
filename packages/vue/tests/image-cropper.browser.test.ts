import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  ImageCropper,
  ImageCropperContext,
  ImageCropperCropArea,
  ImageCropperHandles,
  ImageCropperImage,
  ImageCropperRootProvider,
  ImageCropperViewport,
  useImageCropper,
} from '../src';
import styles from '../src/components/image-cropper/ImageCropper.module.css';
import landscape from './fixtures/landscape.svg';
import SsrImageCropper from './fixtures/SsrImageCropper.vue';

const imageCropperComponents = {
  ImageCropper,
  ImageCropperContext,
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperRootProvider,
  ImageCropperViewport,
};

test('renders the recommended CropArea anatomy with refs, attrs, and styles', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const selectionRef = ref<ComponentPublicInstance>();
  const viewportRef = ref<ComponentPublicInstance>();
  const imageRef = ref<ComponentPublicInstance>();
  const { container } = render(
    defineComponent({
      components: imageCropperComponents,
      setup() {
        return { landscape, imageRef, rootRef, selectionRef, viewportRef };
      },
      template: `
        <ImageCropper ref="rootRef" aria-label="Landscape crop" data-probe="root" class="consumer-root">
          <ImageCropperViewport ref="viewportRef" class="consumer-viewport">
            <ImageCropperImage ref="imageRef" :src="landscape" alt="Landscape" class="consumer-image" />
            <ImageCropperCropArea ref="selectionRef" class="consumer-selection" />
          </ImageCropperViewport>
        </ImageCropper>
      `,
    }),
  );

  const root = rootRef.value?.$el as HTMLElement;
  const viewport = viewportRef.value?.$el as HTMLElement;
  const image = imageRef.value?.$el as HTMLElement;
  const selection = selectionRef.value?.$el as HTMLElement;

  expect(root).toBe(screen.getByRole('group', { name: 'Landscape crop' }));
  expect(root!.getAttribute('data-slot')).toBe('image-cropper-root');
  expect(root!.getAttribute('data-probe')).toBe('root');
  expect([...root!.classList]).toEqual(expect.arrayContaining([styles.root, 'consumer-root']));
  expect(viewport!.getAttribute('data-slot')).toBe('image-cropper-viewport');
  expect([...viewport!.classList]).toEqual(
    expect.arrayContaining([styles.viewport, 'consumer-viewport']),
  );
  expect(image!.getAttribute('data-slot')).toBe('image-cropper-image');
  expect([...image!.classList]).toEqual(expect.arrayContaining([styles.image, 'consumer-image']));
  expect(selection!.getAttribute('data-slot')).toBe('image-cropper-selection');
  expect(selection).toBe(screen.getByRole('slider', { hidden: true }));
  expect(selection!.getAttribute('tabindex')).toBe('0');
  expect([...selection!.classList]).toEqual(
    expect.arrayContaining([styles.selection, 'consumer-selection']),
  );
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
    setup: () => ({ landscape, selectionRef }),
    template: `
      <ImageCropper>
        <ImageCropperViewport>
          <ImageCropperImage :src="landscape" />
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
  await page.locator('[data-slot="image-cropper-selection"]').click();
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
  await expect
    .element(page.locator('[data-slot="image-cropper-selection"]'))
    .toHaveAttribute('aria-label', 'Next crop');
  await expect
    .element(page.locator('[data-slot="image-cropper-selection"]'))
    .toHaveAttribute('data-probe', 'next');
  await expect
    .element(page.locator('[data-slot="image-cropper-selection"]'))
    .toHaveCSS('color', 'rgb(0, 0, 255)');
  await expect
    .element(page.locator('[data-slot="image-cropper-selection"]'))
    .not.toHaveAttribute('children');
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

test('preserves root asChild composition and exposes its semantic host through a Vue ref', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: imageCropperComponents,
    setup() {
      return { landscape, rootRef };
    },
    template: `
      <ImageCropper ref="rootRef" as-child>
        <section aria-label="Landscape crop">
          <ImageCropperViewport>
            <ImageCropperImage :src="landscape" />
            <ImageCropperCropArea />
          </ImageCropperViewport>
        </section>
      </ImageCropper>
    `,
  });

  render(Harness);

  const root = screen.getByRole('group', { name: 'Landscape crop' });
  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('group', { name: 'Landscape crop', exact: true }))
    .toHaveAttribute('data-slot', 'image-cropper-root');
  expect(rootRef.value?.$el).toBe(root);
});

test('preserves Ark keyboard crop commands after the image is ready', async () => {
  render(
    defineComponent({
      setup: () => ({ landscape }),
      components: imageCropperComponents,
      template: `
        <ImageCropper aria-label="Landscape crop">
          <ImageCropperViewport>
            <ImageCropperImage :src="landscape" />
            <ImageCropperCropArea />
          </ImageCropperViewport>
        </ImageCropper>
      `,
    }),
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
    defineComponent({
      setup: () => ({ landscape }),
      components: imageCropperComponents,
      template: `
        <ImageCropper fixed-crop-area aria-label="Avatar crop">
          <ImageCropperViewport>
            <ImageCropperImage :src="landscape" />
            <ImageCropperCropArea />
          </ImageCropperViewport>
        </ImageCropper>
      `,
    }),
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

test('forwards RootProvider and preserves its public hook contract', async () => {
  const ProviderImageCropper = defineComponent({
    components: imageCropperComponents,
    setup() {
      return { landscape, imageCropper: useImageCropper({ aspectRatio: 16 / 9 }) };
    },
    template: `
      <ImageCropperRootProvider :value="imageCropper" data-testid="image-cropper-provider">
        <ImageCropperViewport>
          <ImageCropperImage :src="landscape" />
          <ImageCropperCropArea />
        </ImageCropperViewport>
      </ImageCropperRootProvider>
    `,
  });

  render(ProviderImageCropper);

  await expect
    .element(page.getByTestId('image-cropper-provider'))
    .toHaveAttribute('data-slot', 'image-cropper-root-provider');
});

test('does not forward unsupported CropArea composition props to Ark', async () => {
  const { container } = render(
    defineComponent({
      setup: () => ({ landscape }),
      components: imageCropperComponents,
      template: `
        <ImageCropper>
          <ImageCropperViewport>
            <ImageCropperImage :src="landscape" />
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

test('forwards native Vue v-model and Ark event details', async () => {
  const zoomChanges: number[] = [];
  const Harness = defineComponent({
    components: imageCropperComponents,
    setup() {
      const zoom = ref(1);
      return { landscape, zoom, zoomChanges };
    },
    template: `
        <ImageCropper v-model:zoom="zoom" @zoom-change="zoomChanges.push($event.zoom)">
          <ImageCropperContext v-slot="context">
            <button type="button" @click="context.zoomBy(0.1)">Zoom</button>
          </ImageCropperContext>
          <ImageCropperViewport>
          <ImageCropperImage :src="landscape" />
          <ImageCropperCropArea />
        </ImageCropperViewport>
      </ImageCropper>
      <output>{{ zoom }}</output>
    `,
  });

  render(Harness);

  await expect
    .element(page.locator('[data-slot="image-cropper-image"]'))
    .toHaveAttribute('data-ready');
  await page.getByRole('button', { name: 'Zoom', exact: true }).click();

  await expect.poll(() => zoomChanges.at(-1)).toBe(1.1);
  await expect.element(page.getByText('1.1')).toBeAttached();
});

test('hydrates image-cropper without replacing hosts or IDs and remains interactive', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrImageCropper));
  document.body.append(host);
  const parts = [...host.querySelectorAll('[data-slot]')];
  const ids = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(parts.length).toBeGreaterThan(0);
  expect(ids.length).toBeGreaterThan(0);
  const app = createSSRApp(SsrImageCropper);
  try {
    app.mount(host);
    const hydrated = [...host.querySelectorAll('[data-slot]')];
    expect(hydrated).toHaveLength(parts.length);
    hydrated.forEach((part, index) => expect(part).toBe(parts[index]));
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(ids);
    await expect
      .element(page.locator('[data-slot="image-cropper-image"]'))
      .toHaveAttribute('data-ready');
    const selection = host.querySelector('[data-slot="image-cropper-selection"]')!;
    const before = selection.getAttribute('aria-valuenow');
    await page.getByRole('slider').press('ArrowLeft');
    await expect.element(page.getByRole('slider')).not.toHaveAttribute('aria-valuenow', before!);
  } finally {
    app.unmount();
    host.remove();
  }
});