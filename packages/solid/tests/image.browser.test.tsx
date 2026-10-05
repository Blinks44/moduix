import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Image, ImageSource } from '../src';

const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4';

test('preserves ref forwarding and invariant moduix hooks', () => {
  let imageRef!: HTMLImageElement;
  let sourceRef!: HTMLSourceElement;

  const { container } = render(() => (
    <picture>
      <ImageSource
        ref={(element) => (sourceRef = element)}
        data-slot="custom-source"
        media="(min-width: 48rem)"
        type="image/avif"
        src={imageUrl}
        width={800}
        height={520}
      />
      <Image
        ref={(element) => (imageRef = element)}
        data-slot="custom-root"
        src={imageUrl}
        alt="Mountain landscape"
        width={800}
        height={520}
      />
    </picture>
  ));

  const image = screen.getByAltText('Mountain landscape');
  const source = container.querySelector('source')!;

  expect(imageRef).toBe(image);
  expect(image.getAttribute('data-slot')).toBe('image-root');
  expect(sourceRef).toBe(source);
  expect(source.getAttribute('data-slot')).toBe('image-source');
  expect(source.getAttribute('media')).toBe('(min-width: 48rem)');
  expect(source.getAttribute('type')).toBe('image/avif');
});

test.each([imageUrl, '/__info-new/assets/photo.webp'])(
  'preserves priority, native overrides, and decorative defaults with %s',
  async (src) => {
    const [source, setSource] = createSignal(src);
    const [alt, setAlt] = createSignal<string | undefined>('Mountain landscape');
    const [loading, setLoading] = createSignal<'lazy' | undefined>();
    const [decoding, setDecoding] = createSignal<'sync' | undefined>();
    const [fetchpriority, setFetchpriority] = createSignal<'high' | 'low' | 'auto' | undefined>();

    render(() => (
      <Image
        src={source()}
        alt={alt()}
        width={800}
        height={520}
        priority
        loading={loading()}
        decoding={decoding()}
        fetchpriority={fetchpriority()}
      />
    ));

    const priorityImage = page.getByAltText('Mountain landscape');

    await expect.element(priorityImage).toHaveAttribute('loading', 'eager');
    await expect.element(priorityImage).toHaveAttribute('fetchpriority', 'high');
    await expect.element(priorityImage).not.toHaveAttribute('decoding');

    setLoading('lazy');
    setDecoding('sync');
    setFetchpriority('low');

    const overriddenImage = page.getByAltText('Mountain landscape');

    await expect.element(overriddenImage).toHaveAttribute('loading', 'lazy');
    await expect.element(overriddenImage).toHaveAttribute('decoding', 'sync');
    await expect.element(overriddenImage).toHaveAttribute('fetchpriority', 'low');

    setFetchpriority('auto');

    await expect
      .element(page.getByAltText('Mountain landscape'))
      .toHaveAttribute('fetchpriority', 'auto');

    setSource(imageUrl);
    setAlt('');

    await expect.element(page.getByRole('presentation')).toHaveAttribute('data-slot', 'image-root');
  },
);

test('leaves layout styles to the consumer when unstyled is set', () => {
  render(() => <Image src={imageUrl} alt="Mountain landscape" width={800} height={520} unstyled />);

  expect(screen.getByAltText('Mountain landscape').hasAttribute('style')).toBe(false);
});

test('preserves consumer class names and styles', async () => {
  render(() => (
    <Image
      src={imageUrl}
      alt="Mountain landscape"
      width={800}
      height={520}
      class="consumer-image"
      style={{ 'object-fit': 'contain' }}
    />
  ));

  const image = screen.getByAltText('Mountain landscape');

  expect([...image.classList]).toEqual(expect.arrayContaining(['consumer-image']));
  await expect.element(page.getByAltText('Mountain landscape')).toHaveCSS('object-fit', 'contain');
});
test('defaults local images to lazy loading and async decoding', () => {
  render(() => (
    <Image src="/__info-new/assets/photo.webp" alt="Local photo" width={800} height={520} />
  ));
  const image = screen.getByAltText('Local photo');
  expect(image.getAttribute('loading')).toBe('lazy');
  expect(image.getAttribute('decoding')).toBe('async');
  expect(image.hasAttribute('fetchpriority')).toBe(false);
});