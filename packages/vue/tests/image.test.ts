import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Image, ImageSource } from '../src';

const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4';
const imageComponents = { Image, ImageSource };

test('preserves native refs, attrs, generated sources, and invariant moduix hooks', () => {
  const imageRef = ref<ComponentPublicInstance>();
  const sourceRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
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

  const { container } = render(Harness);
  const image = screen.getByAltText('Mountain landscape');
  const source = container.querySelector('source')!;

  expect(imageRef.value?.$el).toBe(image);
  expect(image).toHaveAttribute('data-slot', 'image-root');
  expect(image).toHaveAttribute('sizes', '(min-width: 800px) 800px, 100vw');
  expect(image).toHaveAttribute('srcset');
  expect(sourceRef.value?.$el).toBe(source);
  expect(source).toHaveAttribute('data-slot', 'image-source');
  expect(source).toHaveAttribute('media', '(min-width: 48rem)');
  expect(source).toHaveAttribute('type', 'image/avif');
  expect(source).toHaveAttribute('srcset');
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

    expect(priorityImage).toHaveAttribute('loading', 'eager');
    expect(priorityImage).toHaveAttribute('fetchpriority', 'high');
    expect(priorityImage).not.toHaveAttribute('decoding');

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

    expect(overriddenImage).toHaveAttribute('loading', 'lazy');
    expect(overriddenImage).toHaveAttribute('decoding', 'sync');
    expect(overriddenImage).toHaveAttribute('fetchpriority', 'low');

    await rerender({
      src,
      alt: 'Mountain landscape',
      width: 800,
      height: 520,
      priority: true,
      fetchpriority: 'auto',
    });

    expect(screen.getByAltText('Mountain landscape')).toHaveAttribute('fetchpriority', 'auto');

    await rerender({ src: imageUrl, alt: '', width: 800, height: 520 });

    expect(screen.getByRole('presentation')).toHaveAttribute('data-slot', 'image-root');
  },
);

test('leaves layout styles to the consumer when unstyled is set', () => {
  render(Image, {
    props: { src: imageUrl, alt: 'Mountain landscape', width: 800, height: 520, unstyled: true },
  });

  expect(screen.getByAltText('Mountain landscape')).not.toHaveAttribute('style');
});

test('preserves consumer classes and styles', () => {
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

  expect(image).toHaveClass('consumer-image');
  expect(image).toHaveStyle({ objectFit: 'contain' });
});

test('renders and hydrates the native picture composition through Vue SSR', async () => {
  const App = defineComponent({
    components: imageComponents,
    template: `
      <picture>
        <ImageSource
          media="(min-width: 48rem)"
          type="image/avif"
          :src="'${imageUrl}'"
          :width="800"
          :height="520"
        />
        <Image :src="'${imageUrl}'" alt="Mountain landscape" :width="800" :height="520" />
      </picture>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="image-root"');
  expect(html).toContain('data-slot="image-source"');
  expect(html).toContain('srcset=');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelectorAll('picture')).toHaveLength(1);
  expect(host.querySelector('[data-slot="image-root"]')).toHaveAttribute(
    'alt',
    'Mountain landscape',
  );
  expect(host.querySelector('[data-slot="image-source"]')).toHaveAttribute(
    'media',
    '(min-width: 48rem)',
  );

  app.unmount();
  host.remove();
});
test('defaults local images to lazy loading and async decoding', () => {
  render(Image, {
    props: { src: '/__info-new/assets/photo.webp', alt: 'Local photo', width: 800, height: 520 },
  });
  const image = screen.getByAltText('Local photo');
  expect(image).toHaveAttribute('loading', 'lazy');
  expect(image).toHaveAttribute('decoding', 'async');
  expect(image).not.toHaveAttribute('fetchpriority');
});