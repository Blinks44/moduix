import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Image, ImageSource } from '../src';

const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4';

test('preserves ref forwarding and invariant moduix hooks', () => {
  const imageRef = createRef<HTMLImageElement>();
  const sourceRef = createRef<HTMLSourceElement>();

  const { container } = render(
    <picture>
      <ImageSource
        ref={sourceRef}
        data-slot="custom-source"
        media="(min-width: 48rem)"
        type="image/avif"
        src={imageUrl}
        width={800}
        height={520}
      />
      <Image
        ref={imageRef}
        data-slot="custom-root"
        src={imageUrl}
        alt="Mountain landscape"
        width={800}
        height={520}
      />
    </picture>,
  );

  const image = screen.getByAltText('Mountain landscape');
  const source = container.querySelector('source')!;

  expect(imageRef.current).toBe(image);
  expect([...image.classList]).toEqual(expect.arrayContaining(['rounded-md']));
  expect(image.getAttribute('data-slot')).toBe('image-root');
  expect(sourceRef.current).toBe(source);
  expect(source.getAttribute('data-slot')).toBe('image-source');
  expect(source.getAttribute('media')).toBe('(min-width: 48rem)');
  expect(source.getAttribute('type')).toBe('image/avif');
});

test.each([imageUrl, '/__info-new/assets/photo.webp'])(
  'preserves priority, native overrides, and decorative defaults with %s',
  (src) => {
    const { rerender } = render(
      <Image src={src} alt="Mountain landscape" width={800} height={520} priority />,
    );

    const priorityImage = screen.getByAltText('Mountain landscape');

    expect(priorityImage.getAttribute('loading')).toBe('eager');
    expect(priorityImage.getAttribute('fetchpriority')).toBe('high');
    expect(priorityImage.hasAttribute('decoding')).toBe(false);

    rerender(
      <Image
        src={src}
        alt="Mountain landscape"
        width={800}
        height={520}
        priority
        loading="lazy"
        decoding="sync"
        fetchPriority="low"
      />,
    );

    const overriddenImage = screen.getByAltText('Mountain landscape');

    expect(overriddenImage.getAttribute('loading')).toBe('lazy');
    expect(overriddenImage.getAttribute('decoding')).toBe('sync');
    expect(overriddenImage.getAttribute('fetchpriority')).toBe('low');

    rerender(
      <Image
        src={src}
        alt="Mountain landscape"
        width={800}
        height={520}
        priority
        fetchPriority="auto"
      />,
    );

    expect(screen.getByAltText('Mountain landscape').getAttribute('fetchpriority')).toBe('auto');

    rerender(<Image src={imageUrl} alt="" width={800} height={520} />);

    expect(screen.getByRole('presentation').getAttribute('data-slot')).toBe('image-root');
  },
);

test('leaves layout styles to the consumer when unstyled is set', () => {
  render(<Image src={imageUrl} alt="Mountain landscape" width={800} height={520} unstyled />);

  expect(screen.getByAltText('Mountain landscape').hasAttribute('style')).toBe(false);
});

test('preserves consumer class names and styles', async () => {
  render(
    <Image
      src={imageUrl}
      alt="Mountain landscape"
      width={800}
      height={520}
      className="consumer-image rounded-none"
      style={{ objectFit: 'contain' }}
    />,
  );

  const image = screen.getByAltText('Mountain landscape');

  expect([...image.classList]).toEqual(expect.arrayContaining(['consumer-image']));
  await expect.element(page.getByAltText('Mountain landscape')).toHaveCSS('object-fit', 'contain');
  expect([...image.classList]).toEqual(expect.arrayContaining(['rounded-none']));
  expect(image.classList.contains('rounded-md')).toBe(false);
  await expect.element(page.getByAltText('Mountain landscape')).toHaveCSS('border-radius', '0px');
});

test('defaults local images to lazy loading and async decoding', () => {
  render(<Image src="/__info-new/assets/photo.webp" alt="Local photo" width={800} height={520} />);
  const image = screen.getByAltText('Local photo');
  expect(image.getAttribute('loading')).toBe('lazy');
  expect(image.getAttribute('decoding')).toBe('async');
  expect(image.hasAttribute('fetchpriority')).toBe(false);
});