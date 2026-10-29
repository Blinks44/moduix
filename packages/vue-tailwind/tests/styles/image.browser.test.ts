import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { Image } from '@/index';

const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4';

test('preserves consumer classes and styles', async () => {
  render(Image, {
    props: {
      src: imageUrl,
      alt: 'Mountain landscape',
      width: 800,
      height: 520,
      class: 'consumer-image rounded-none',
      style: { objectFit: 'contain' },
    },
  });

  const image = screen.getByAltText('Mountain landscape');

  expect([...image.classList]).toEqual(expect.arrayContaining(['consumer-image']));
  await expect.element(page.getByAltText('Mountain landscape')).toHaveCSS('object-fit', 'contain');
  expect([...image.classList]).toEqual(expect.arrayContaining(['rounded-none']));
  await expect.element(page.getByAltText('Mountain landscape')).toHaveCSS('border-radius', '0px');
});