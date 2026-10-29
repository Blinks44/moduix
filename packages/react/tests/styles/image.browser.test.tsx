import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Image } from '@/index';

const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4';

test('preserves consumer class names and styles', async () => {
  render(
    <Image
      src={imageUrl}
      alt="Mountain landscape"
      width={800}
      height={520}
      className="consumer-image"
      style={{ objectFit: 'contain' }}
    />,
  );

  const image = screen.getByAltText('Mountain landscape');

  expect([...image.classList]).toEqual(expect.arrayContaining(['consumer-image']));
  await expect.element(page.getByAltText('Mountain landscape')).toHaveCSS('object-fit', 'contain');
});