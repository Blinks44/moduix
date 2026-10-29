import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import {
  Lightbox,
  LightboxBackdrop,
  LightboxBind,
  LightboxBody,
  LightboxCloseIcon,
  LightboxCloseTrigger,
  LightboxContent,
  LightboxDescription,
  LightboxFooter,
  LightboxGallery,
  LightboxHeader,
  LightboxImage,
  LightboxPositioner,
  LightboxRootProvider,
  LightboxTitle,
  LightboxTrigger,
} from '@/index';

const lightboxComponents = {
  Lightbox,
  LightboxBackdrop,
  LightboxBind,
  LightboxBody,
  LightboxCloseIcon,
  LightboxCloseTrigger,
  LightboxContent,
  LightboxDescription,
  LightboxFooter,
  LightboxGallery,
  LightboxHeader,
  LightboxImage,
  LightboxPositioner,
  LightboxRootProvider,
  LightboxTitle,
  LightboxTrigger,
};

test('merges consumer utilities over Tailwind defaults', async () => {
  render({
    components: lightboxComponents,
    template: `
      <Lightbox default-open :portalled="false">
        <LightboxBackdrop class="bg-red-500" />
        <LightboxPositioner class="p-8">
          <LightboxContent class="max-w-full" aria-label="Image preview">
            <LightboxCloseIcon class="size-10" />
            <LightboxImage class="rounded-none" src="/full-size.jpg" alt="Mountain ridge" />
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    `,
  });

  expect([...document.querySelector('[data-slot="lightbox-backdrop"]')!.classList]).toEqual(
    expect.arrayContaining(['bg-red-500']),
  );
  expect([...document.querySelector('[data-slot="lightbox-positioner"]')!.classList]).toEqual(
    expect.arrayContaining(['p-8']),
  );
  expect([...document.querySelector('[data-slot="lightbox-close-icon"]')!.classList]).toEqual(
    expect.arrayContaining(['size-10']),
  );
  expect([...document.querySelector('[data-slot="lightbox-content"]')!.classList]).toEqual(
    expect.arrayContaining(['max-w-full']),
  );
  expect([...document.querySelector('[data-slot="lightbox-image"]')!.classList]).toEqual(
    expect.arrayContaining(['rounded-none']),
  );

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