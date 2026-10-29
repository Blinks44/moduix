import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import {
  ImageCropper,
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperViewport,
} from '@/index';
import landscape from '../fixtures/landscape.svg';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(
    <ImageCropper className="gap-0" aria-label="Landscape crop">
      <ImageCropperViewport>
        <ImageCropperImage src={landscape} />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>,
  );

  const root = screen.getByRole('group', { name: 'Landscape crop' });
  expect([...root!.classList]).toEqual(expect.arrayContaining(['gap-0']));
});