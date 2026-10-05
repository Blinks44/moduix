import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { useRef, useState } from 'react';
import {
  LightboxRootProvider,
  LightboxTrigger,
  LightboxPositioner,
  LightboxContent,
  LightboxCloseIcon,
  LightboxImage,
  LightboxBind,
  Lightbox,
  useLightbox,
  useLightboxContext,
  type LightboxImageSelectDetails,
} from '../src';

test('opens from a semantic Bind selector', async () => {
  function BoundLightbox() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [image, setImage] = useState<LightboxImageSelectDetails | null>(null);

    return (
      <>
        <div ref={rootRef}>
          <button type="button">
            <img src="/thumbnail.jpg" data-lightbox-src="/full-size.jpg" alt="Mountain ridge" />
          </button>
        </div>
        <Lightbox portalled={false}>
          <LightboxBind rootRef={rootRef} selector="button" onImageSelect={setImage} />
          <LightboxPositioner>
            <LightboxContent aria-label="Image preview">
              {image ? <LightboxImage src={image.src} alt={image.alt ?? ''} /> : null}
            </LightboxContent>
          </LightboxPositioner>
        </Lightbox>
      </>
    );
  }

  render(<BoundLightbox />);
  await page.getByRole('button').click();

  await expect
    .element(page.getByRole('dialog', { name: 'Image preview', exact: true }))
    .toBeAttached();
  await expect
    .element(page.getByRole('img', { name: 'Mountain ridge', exact: true }))
    .toHaveAttribute('src', '/full-size.jpg');
});

test('keeps the lightbox open when an image click is prevented', async () => {
  render(
    <Lightbox defaultOpen portalled={false}>
      <LightboxPositioner>
        <LightboxContent aria-label="Image preview">
          <LightboxImage
            src="/full-size.jpg"
            alt="Mountain ridge"
            closeOnClick
            onClick={(event) => event.preventDefault()}
          />
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>,
  );

  await page.getByRole('img', { name: 'Mountain ridge', exact: true }).click();

  await expect
    .element(page.getByRole('dialog', { name: 'Image preview', exact: true }))
    .toBeAttached();
});

test('lazily mounts, closes a click-to-close image, and restores focus', async () => {
  render(
    <Lightbox portalled={false}>
      <LightboxTrigger>Open preview</LightboxTrigger>
      <LightboxPositioner>
        <LightboxContent aria-label="Image preview">
          <LightboxImage src="/full-size.jpg" alt="Mountain ridge" closeOnClick />
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>,
  );

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Open preview', exact: true }).click();
  await page.getByRole('img', { name: 'Mountain ridge', exact: true }).click();

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect
    .element(page.getByRole('button', { name: 'Open preview', exact: true }))
    .toBeFocused();
});

test('closes from its accessible close icon and restores focus to its trigger', async () => {
  render(
    <Lightbox portalled={false}>
      <LightboxTrigger>Open preview</LightboxTrigger>
      <LightboxPositioner>
        <LightboxCloseIcon />
        <LightboxContent aria-label="Image preview">
          <LightboxImage src="/full-size.jpg" alt="Mountain ridge" />
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>,
  );

  await page.getByRole('button', { name: 'Open preview', exact: true }).click();
  await expect
    .element(page.getByRole('dialog', { name: 'Image preview', exact: true }))
    .toBeFocused();
  await expect
    .element(page.getByRole('button', { name: 'Close image', exact: true }))
    .toBeVisible();
  await page.getByRole('button', { name: 'Close image', exact: true }).click();

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect
    .element(page.getByRole('button', { name: 'Open preview', exact: true }))
    .toBeFocused();
});

test('exposes RootProvider state through useLightboxContext', async () => {
  function LightboxStatus() {
    const dialog = useLightboxContext();

    return <output>Open: {String(dialog.open)}</output>;
  }

  function ProviderLightbox() {
    const lightbox = useLightbox();

    return (
      <>
        <button type="button" onClick={() => lightbox.setOpen(true)}>
          Open preview
        </button>
        <LightboxRootProvider value={lightbox} portalled={false}>
          <LightboxPositioner>
            <LightboxContent aria-label="Image preview">
              <LightboxStatus />
            </LightboxContent>
          </LightboxPositioner>
        </LightboxRootProvider>
      </>
    );
  }

  render(<ProviderLightbox />);
  await page.getByRole('button', { name: 'Open preview', exact: true }).click();

  await expect
    .element(page.getByRole('dialog', { name: 'Image preview', exact: true }))
    .toBeAttached();
  await expect.element(page.getByText('Open: true')).toBeAttached();
});

test('keeps the close-on-click marker aligned with its behavior', async () => {
  render(
    <>
      <Lightbox defaultOpen portalled={false}>
        <LightboxPositioner>
          <LightboxContent aria-label="First preview">
            <LightboxImage
              alt="Closes"
              closeOnClick
              data-close-on-click={undefined}
              src="/first.jpg"
            />
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
      <Lightbox defaultOpen portalled={false}>
        <LightboxPositioner>
          <LightboxContent aria-label="Second preview">
            <LightboxImage alt="Stays open" data-close-on-click="" src="/second.jpg" />
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    </>,
  );

  await expect.element(page.locator('img[alt="Closes"]')).toHaveAttribute('data-close-on-click');
  await expect
    .element(page.locator('img[alt="Stays open"]'))
    .not.toHaveAttribute('data-close-on-click');
});

test.each([
  { name: 'src fallback', currentSrc: '', override: undefined, expected: undefined },
  {
    name: 'responsive source',
    currentSrc: '/responsive.jpg',
    override: undefined,
    expected: '/responsive.jpg',
  },
  {
    name: 'full-size override',
    currentSrc: '/responsive.jpg',
    override: '/full.jpg',
    expected: '/full.jpg',
  },
  { name: 'explicit exclusion', currentSrc: '/responsive.jpg', override: '', expected: '' },
])('resolves Bind images: $name', async ({ currentSrc, override, expected }) => {
  const onImageSelect = rs.fn();
  function BoundGallery() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    return (
      <>
        <div ref={rootRef}>
          <button type="button">
            <img src="/thumbnail.jpg" alt="Bound image" />
          </button>
        </div>
        <Lightbox portalled={false}>
          <LightboxBind rootRef={rootRef} selector="button" onImageSelect={onImageSelect} />
          <LightboxPositioner>
            <LightboxContent aria-label="Bound preview">Bound image preview</LightboxContent>
          </LightboxPositioner>
        </Lightbox>
      </>
    );
  }
  render(<BoundGallery />);
  const image = screen.getByAltText('Bound image') as HTMLImageElement;
  Object.defineProperty(image, 'currentSrc', { configurable: true, value: currentSrc });
  if (override !== undefined) image.dataset.lightboxSrc = override;

  await page.getByAltText('Bound image').click();

  if (expected === '') {
    expect(onImageSelect).not.toHaveBeenCalled();
    await expect
      .element(page.getByRole('dialog', { name: 'Bound preview', exact: true }))
      .toHaveCount(0);
    return;
  }
  expect(onImageSelect).toHaveBeenCalledWith({
    src: expected ?? image.src,
    alt: 'Bound image',
    element: image,
  });
  await expect
    .element(page.getByRole('dialog', { name: 'Bound preview', exact: true }))
    .toBeAttached();
});