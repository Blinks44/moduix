import { expect, test } from '@rstest/core';
import { render, screen, waitFor } from '@solidjs/testing-library';
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
  expect(image).toHaveClass('rounded-md');
  expect(image).toHaveAttribute('data-slot', 'image-root');
  expect(sourceRef).toBe(source);
  expect(source).toHaveAttribute('data-slot', 'image-source');
  expect(source).toHaveAttribute('media', '(min-width: 48rem)');
  expect(source).toHaveAttribute('type', 'image/avif');
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

    const priorityImage = screen.getByAltText('Mountain landscape');

    expect(priorityImage).toHaveAttribute('loading', 'eager');
    expect(priorityImage).toHaveAttribute('fetchpriority', 'high');
    expect(priorityImage).not.toHaveAttribute('decoding');

    setLoading('lazy');
    setDecoding('sync');
    setFetchpriority('low');

    const overriddenImage = screen.getByAltText('Mountain landscape');

    await waitFor(() => {
      expect(overriddenImage).toHaveAttribute('loading', 'lazy');
      expect(overriddenImage).toHaveAttribute('decoding', 'sync');
      expect(overriddenImage).toHaveAttribute('fetchpriority', 'low');
    });

    setFetchpriority('auto');

    await waitFor(() =>
      expect(screen.getByAltText('Mountain landscape')).toHaveAttribute('fetchpriority', 'auto'),
    );

    setSource(imageUrl);
    setAlt('');

    await waitFor(() =>
      expect(screen.getByRole('presentation')).toHaveAttribute('data-slot', 'image-root'),
    );
  },
);

test('leaves layout styles to the consumer when unstyled is set', () => {
  render(() => <Image src={imageUrl} alt="Mountain landscape" width={800} height={520} unstyled />);

  expect(screen.getByAltText('Mountain landscape')).not.toHaveAttribute('style');
});

test('preserves consumer class names and styles', () => {
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

  expect(image).toHaveClass('consumer-image');
  expect(image).toHaveStyle({ objectFit: 'contain' });
});

test('lets consumer Tailwind classes override the default radius', () => {
  render(() => (
    <Image src={imageUrl} alt="Mountain landscape" width={800} height={520} class="rounded-none" />
  ));

  const image = screen.getByAltText('Mountain landscape');

  expect(image).toHaveClass('rounded-none');
  expect(image).not.toHaveClass('rounded-md');
});
test('defaults local images to lazy loading and async decoding', () => {
  render(() => (
    <Image src="/__info-new/assets/photo.webp" alt="Local photo" width={800} height={520} />
  ));
  const image = screen.getByAltText('Local photo');
  expect(image).toHaveAttribute('loading', 'lazy');
  expect(image).toHaveAttribute('decoding', 'async');
  expect(image).not.toHaveAttribute('fetchpriority');
});