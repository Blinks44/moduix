import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Image } from '../src';

const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4';

test('preserves ref forwarding and invariant moduix hooks', () => {
  const imageRef = createRef<HTMLImageElement>();
  const sourceRef = createRef<HTMLSourceElement>();

  const { container } = render(
    <picture>
      <Image.Source
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

  expect(Image.Root).toBe(Image);
  expect(imageRef.current).toBe(image);
  expect(image).toHaveAttribute('data-slot', 'image-root');
  expect(sourceRef.current).toBe(source);
  expect(source).toHaveAttribute('data-slot', 'image-source');
  expect(source).toHaveAttribute('media', '(min-width: 48rem)');
  expect(source).toHaveAttribute('type', 'image/avif');
});

test('preserves Unpic priority and decorative image defaults', () => {
  const { rerender } = render(
    <Image src={imageUrl} alt="Mountain landscape" width={800} height={520} priority />,
  );

  const priorityImage = screen.getByAltText('Mountain landscape');

  expect(priorityImage).toHaveAttribute('loading', 'eager');
  expect(priorityImage).toHaveAttribute('fetchpriority', 'high');
  expect(priorityImage).not.toHaveAttribute('decoding');

  rerender(<Image src={imageUrl} alt="" width={800} height={520} />);

  expect(screen.getByRole('presentation')).toHaveAttribute('data-slot', 'image-root');
});

test('leaves layout styles to the consumer when unstyled is set', () => {
  render(<Image src={imageUrl} alt="Mountain landscape" width={800} height={520} unstyled />);

  expect(screen.getByAltText('Mountain landscape')).not.toHaveAttribute('style');
});