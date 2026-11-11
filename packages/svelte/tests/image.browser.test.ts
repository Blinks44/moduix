import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import { Image } from '@/index';
import PictureImage from './image/PictureImage.svelte';

const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4';

test('preserves native refs, attrs, generated sources, and invariant moduix hooks', () => {
  const { component, container } = render(PictureImage);
  const image = screen.getByAltText('Mountain landscape');
  const source = container.querySelector('source')!;

  expect(component.getRefs().imageRef).toBe(image);
  expect(image.getAttribute('data-slot')).toBe('image-root');
  expect(image.getAttribute('sizes')).toBe('(min-width: 800px) 800px, 100vw');
  expect(image.hasAttribute('srcset')).toBe(true);
  expect(component.getRefs().sourceRef).toBe(source);
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

test('appends a consumer style string after the generated layout styles', () => {
  render(Image, {
    props: {
      src: '/__info-new/assets/photo.webp',
      alt: 'Local photo',
      width: 800,
      height: 520,
      style: 'opacity: 0.5',
    },
  });
  const image = screen.getByAltText('Local photo');

  expect(image.style.opacity).toBe('0.5');
  expect(image.style.objectFit).toBe('cover');
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

test('keeps Unpic-only props off images without a CDN and applies their layout', () => {
  render(Image, {
    props: {
      src: '/__info-new/assets/photo.webp',
      alt: 'Local photo',
      layout: 'fixed',
      width: 192,
      height: 256,
      priority: true,
      background: '#eee',
    },
  });
  const image = screen.getByAltText('Local photo');

  for (const name of ['layout', 'priority', 'background', 'aspectratio', 'unstyled']) {
    expect(image.hasAttribute(name)).toBe(false);
  }
  expect(image.getAttribute('loading')).toBe('eager');
  expect(image.getAttribute('fetchpriority')).toBe('high');
  expect(image.style.width).toBe('192px');
  expect(image.style.height).toBe('256px');
});