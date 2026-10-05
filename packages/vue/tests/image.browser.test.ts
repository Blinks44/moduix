import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Image, ImageSource } from '../src';
import SsrImage from './fixtures/SsrImage.vue';

const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4';
const imageComponents = { Image, ImageSource };

test('preserves native refs, attrs, generated sources, and invariant moduix hooks', () => {
  const imageRef = ref<ComponentPublicInstance>();
  const sourceRef = ref<ComponentPublicInstance>();
  const { container } = render({
    components: imageComponents,
    setup() {
      return { imageRef, sourceRef };
    },
    template: `
      <picture>
        <ImageSource
          ref="sourceRef"
          data-slot="custom-source"
          media="(min-width: 48rem)"
          type="image/avif"
          :src="'${imageUrl}'"
          :width="800"
          :height="520"
        />
        <Image
          ref="imageRef"
          data-slot="custom-root"
          :src="'${imageUrl}'"
          alt="Mountain landscape"
          :width="800"
          :height="520"
        />
      </picture>
    `,
  });
  const image = screen.getByAltText('Mountain landscape');
  const source = container.querySelector('source')!;

  expect(imageRef.value?.$el).toBe(image);
  expect(image.getAttribute('data-slot')).toBe('image-root');
  expect(image.getAttribute('sizes')).toBe('(min-width: 800px) 800px, 100vw');
  expect(image.hasAttribute('srcset')).toBe(true);
  expect(sourceRef.value?.$el).toBe(source);
  expect(source.getAttribute('data-slot')).toBe('image-source');
  expect(source.getAttribute('media')).toBe('(min-width: 48rem)');
  expect(source.getAttribute('type')).toBe('image/avif');
  expect(source.hasAttribute('srcset')).toBe(true);
});

test.each([imageUrl, '/__info-new/assets/photo.webp'])(
  'preserves priority, native overrides, and decorative defaults with %s',
  async (src) => {
    const { rerender } = render(Image, {
      props: {
        src,
        alt: 'Mountain landscape',
        width: 800,
        height: 520,
        priority: true,
      },
    });

    const priorityImage = screen.getByAltText('Mountain landscape');

    expect(priorityImage.getAttribute('loading')).toBe('eager');
    expect(priorityImage.getAttribute('fetchpriority')).toBe('high');
    expect(priorityImage.hasAttribute('decoding')).toBe(false);

    await rerender({
      src,
      alt: 'Mountain landscape',
      width: 800,
      height: 520,
      priority: true,
      loading: 'lazy',
      decoding: 'sync',
      fetchpriority: 'low',
    });

    const overriddenImage = screen.getByAltText('Mountain landscape');

    expect(overriddenImage.getAttribute('loading')).toBe('lazy');
    expect(overriddenImage.getAttribute('decoding')).toBe('sync');
    expect(overriddenImage.getAttribute('fetchpriority')).toBe('low');

    await rerender({
      src,
      alt: 'Mountain landscape',
      width: 800,
      height: 520,
      priority: true,
      fetchpriority: 'auto',
    });

    expect(screen.getByAltText('Mountain landscape').getAttribute('fetchpriority')).toBe('auto');

    await rerender({ src: imageUrl, alt: '', width: 800, height: 520 });

    expect(screen.getByRole('presentation').getAttribute('data-slot')).toBe('image-root');
  },
);

test('leaves layout styles to the consumer when unstyled is set', () => {
  render(Image, {
    props: { src: imageUrl, alt: 'Mountain landscape', width: 800, height: 520, unstyled: true },
  });

  expect(screen.getByAltText('Mountain landscape').hasAttribute('style')).toBe(false);
});

test('preserves consumer classes and styles', async () => {
  render(Image, {
    props: {
      src: imageUrl,
      alt: 'Mountain landscape',
      width: 800,
      height: 520,
      class: 'consumer-image',
      style: { objectFit: 'contain' },
    },
  });

  const image = screen.getByAltText('Mountain landscape');

  expect([...image.classList]).toEqual(expect.arrayContaining(['consumer-image']));
  await expect.element(page.getByAltText('Mountain landscape')).toHaveCSS('object-fit', 'contain');
});

test('hydrates picture composition without replacing native hosts', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrImage));
  document.body.append(host);
  const picture = host.querySelector('picture');
  const nodes = [...host.querySelectorAll('[data-slot]')];
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrImage);
  try {
    app.mount(host);
    expect(host.querySelectorAll('picture')).toHaveLength(1);
    expect(host.querySelector('picture')).toBe(picture);
    const hydrated = [...host.querySelectorAll('[data-slot]')];
    expect(hydrated).toHaveLength(nodes.length);
    hydrated.forEach((node, index) => expect(node).toBe(nodes[index]));
    expect(host.querySelector('[data-slot="image-root"]')?.getAttribute('alt')).toBe(
      'Mountain landscape',
    );
    expect(host.querySelector('[data-slot="image-source"]')?.getAttribute('media')).toBe(
      '(min-width: 48rem)',
    );
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});
test('defaults local images to lazy loading and async decoding', () => {
  render(Image, {
    props: { src: '/__info-new/assets/photo.webp', alt: 'Local photo', width: 800, height: 520 },
  });
  const image = screen.getByAltText('Local photo');
  expect(image.getAttribute('loading')).toBe('lazy');
  expect(image.getAttribute('decoding')).toBe('async');
  expect(image.hasAttribute('fetchpriority')).toBe(false);
});