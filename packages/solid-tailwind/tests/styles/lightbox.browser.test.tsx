import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  LightboxTrigger,
  LightboxBackdrop,
  LightboxPositioner,
  LightboxContent,
  LightboxTitle,
  LightboxDescription,
  LightboxCloseTrigger,
  LightboxCloseIcon,
  LightboxHeader,
  LightboxBody,
  LightboxFooter,
  LightboxImage,
  LightboxGallery,
  Lightbox,
} from '@/index';

test('forwards refs through native parts and keeps asChild composition native', () => {
  let triggerRef!: HTMLButtonElement;
  let backdropRef!: HTMLDivElement;
  let positionerRef!: HTMLDivElement;
  let contentRef!: HTMLDivElement;
  let titleRef!: HTMLHeadingElement;
  let descriptionRef!: HTMLDivElement;
  let closeTriggerRef!: HTMLButtonElement;
  let imageRef!: HTMLImageElement;
  let galleryRef!: HTMLDivElement;
  let headerRef!: HTMLDivElement;
  let bodyRef!: HTMLDivElement;
  let footerRef!: HTMLDivElement;
  let composedTriggerRef: HTMLButtonElement | undefined;
  let closeIconRef: HTMLButtonElement | undefined;

  render(() => (
    <Lightbox defaultOpen portalled={false}>
      <LightboxTrigger ref={(element) => (triggerRef = element)}>Open preview</LightboxTrigger>
      <LightboxTrigger
        ref={(element) => (composedTriggerRef = element)}
        asChild={(props) => (
          <button {...props()} type="button">
            Composed trigger
          </button>
        )}
      />
      <LightboxBackdrop ref={(element) => (backdropRef = element)} />
      <LightboxPositioner ref={(element) => (positionerRef = element)}>
        <LightboxContent ref={(element) => (contentRef = element)}>
          <LightboxCloseIcon ref={(element) => (closeIconRef = element)} />
          <LightboxHeader ref={(element) => (headerRef = element)}>
            <LightboxTitle ref={(element) => (titleRef = element)}>Preview</LightboxTitle>
            <LightboxDescription ref={(element) => (descriptionRef = element)}>
              Description
            </LightboxDescription>
          </LightboxHeader>
          <LightboxBody ref={(element) => (bodyRef = element)}>
            <LightboxImage
              ref={(element) => (imageRef = element)}
              src="/full-size.jpg"
              alt="Mountain ridge"
            />
            <LightboxGallery ref={(element) => (galleryRef = element)} />
          </LightboxBody>
          <LightboxFooter ref={(element) => (footerRef = element)} />
          <LightboxCloseTrigger ref={(element) => (closeTriggerRef = element)}>
            Close
          </LightboxCloseTrigger>
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  ));

  expect(triggerRef.getAttribute('data-slot')).toBe('lightbox-trigger');
  expect(backdropRef.getAttribute('data-slot')).toBe('lightbox-backdrop');
  expect(positionerRef.getAttribute('data-slot')).toBe('lightbox-positioner');
  expect(contentRef.getAttribute('data-slot')).toBe('lightbox-content');
  expect(titleRef.getAttribute('data-slot')).toBe('lightbox-title');
  expect(descriptionRef.getAttribute('data-slot')).toBe('lightbox-description');
  expect(closeTriggerRef.getAttribute('data-slot')).toBe('lightbox-close-trigger');
  expect(imageRef.getAttribute('data-slot')).toBe('lightbox-image');
  expect(galleryRef.getAttribute('data-slot')).toBe('lightbox-gallery');
  expect(headerRef.getAttribute('data-slot')).toBe('lightbox-header');
  expect(bodyRef.getAttribute('data-slot')).toBe('lightbox-body');
  expect(footerRef.getAttribute('data-slot')).toBe('lightbox-footer');
  expect(composedTriggerRef).toBeUndefined();
  expect(closeIconRef).toBeUndefined();
});

test('merges consumer utilities over Tailwind defaults', async () => {
  render(() => (
    <Lightbox defaultOpen portalled={false}>
      <LightboxBackdrop class="bg-red-500" />
      <LightboxPositioner class="p-8">
        <LightboxContent class="max-w-full" aria-label="Image preview">
          <LightboxCloseIcon class="size-10" />
          <LightboxImage class="rounded-none" src="/full-size.jpg" alt="Mountain ridge" />
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  ));

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