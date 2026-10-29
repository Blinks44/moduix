import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import {
  LightboxBackdrop,
  LightboxPositioner,
  LightboxContent,
  LightboxCloseIcon,
  LightboxImage,
  Lightbox,
} from '@/index';

test('merges consumer utilities over Tailwind defaults', async () => {
  render(
    <Lightbox defaultOpen portalled={false}>
      <LightboxBackdrop className="bg-red-500" />
      <LightboxPositioner className="p-8">
        <LightboxContent className="max-w-full" aria-label="Image preview">
          <LightboxCloseIcon className="size-10" />
          <LightboxImage className="rounded-none" src="/full-size.jpg" alt="Mountain ridge" />
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>,
  );

  const backdrop = document.querySelector('[data-slot="lightbox-backdrop"]');
  const positioner = document.querySelector('[data-slot="lightbox-positioner"]');
  const closeIcon = document.querySelector('[data-slot="lightbox-close-icon"]');
  const content = document.querySelector('[data-slot="lightbox-content"]');
  const image = document.querySelector('[data-slot="lightbox-image"]');

  expect([...backdrop!.classList]).toEqual(expect.arrayContaining(['bg-red-500']));
  expect([...positioner!.classList]).toEqual(expect.arrayContaining(['p-8']));
  expect([...closeIcon!.classList]).toEqual(expect.arrayContaining(['size-10']));
  expect([...content!.classList]).toEqual(expect.arrayContaining(['max-w-full']));
  expect([...image!.classList]).toEqual(expect.arrayContaining(['rounded-none']));

  await expect
    .element(page.locator('[data-slot="lightbox-positioner"]'))
    .toHaveCSS('padding', '32px');
  await expect
    .element(page.locator('[data-slot="lightbox-close-icon"]'))
    .toHaveCSS('width', '40px');
  await expect
    .element(page.locator('[data-slot="lightbox-image"]'))
    .toHaveCSS('border-radius', '0px');
});