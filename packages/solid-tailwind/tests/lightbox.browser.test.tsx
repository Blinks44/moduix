import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  LightboxRootProvider,
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
  LightboxBind,
  Lightbox,
  useLightbox,
  useLightboxContext,
  type LightboxImageSelectDetails,
} from '../src';

test.each([false, true])('supports bound image handlers (prevented=%s)', async (prevented) => {
  const payload = { action: 'close-preview' };
  const calls: unknown[] = [];
  render(() => (
    <Lightbox defaultOpen portalled={false}>
      <LightboxPositioner>
        <LightboxContent aria-label="Image preview">
          <LightboxImage
            src="/full-size.jpg"
            alt="Mountain ridge"
            closeOnClick
            onClick={[
              (data, event) => {
                calls.push(data, event.currentTarget);
                if (prevented) event.preventDefault();
              },
              payload,
            ]}
          />
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  ));
  const image = screen.getByRole('img', { name: 'Mountain ridge' });
  await page.getByRole('img', { name: 'Mountain ridge', exact: true }).click();
  expect(calls).toEqual([payload, image]);
  await expect
    .poll(() => screen.queryByRole('dialog', { name: 'Image preview' }) !== null)
    .toBe(prevented);
});

test('rebinds the gallery root and removes delegated listeners on cleanup', async () => {
  let first!: HTMLDivElement;
  let second!: HTMLDivElement;
  const [useSecond, setUseSecond] = createSignal(false);
  const calls: string[] = [];
  const { unmount } = render(() => (
    <>
      <div ref={(element) => (first = element)}>
        <button>
          <img src="/first.jpg" alt="First" />
        </button>
      </div>
      <div ref={(element) => (second = element)}>
        <button>
          <img src="/second.jpg" alt="Second" />
        </button>
      </div>
      <Lightbox open={false}>
        <LightboxBind
          rootRef={() => (useSecond() ? second : first)}
          selector="button"
          onImageSelect={(details) => calls.push(details.src)}
        />
      </Lightbox>
    </>
  ));
  await page.getByRole('button', { name: 'First', exact: true }).click();
  const firstSrc = first.querySelector('img')!.src;
  const secondSrc = second.querySelector('img')!.src;
  expect(calls).toEqual([firstSrc]);
  setUseSecond(true);
  await page.getByRole('button', { name: 'First', exact: true }).click();
  await page.getByRole('button', { name: 'Second', exact: true }).click();
  expect(calls).toEqual([firstSrc, secondSrc]);
  const detachedButton = second.querySelector('button')!;
  unmount();
  detachedButton.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  expect(calls).toHaveLength(2);
});

test('opens from a semantic Bind selector', async () => {
  function BoundLightbox() {
    let rootRef: HTMLDivElement | undefined;
    const [image, setImage] = createSignal<LightboxImageSelectDetails | null>(null);

    return (
      <>
        <div ref={(element) => (rootRef = element)}>
          <button type="button">
            <img src="/thumbnail.jpg" data-lightbox-src="/full-size.jpg" alt="Mountain ridge" />
          </button>
        </div>
        <Lightbox portalled={false}>
          <LightboxBind
            rootRef={() => rootRef}
            selector="button"
            onImageSelect={(details) => setImage(details)}
          />
          <LightboxPositioner>
            <LightboxContent aria-label="Image preview">
              {image() ? <LightboxImage src={image()!.src} alt={image()!.alt ?? ''} /> : null}
            </LightboxContent>
          </LightboxPositioner>
        </Lightbox>
      </>
    );
  }

  render(() => <BoundLightbox />);
  await page.getByRole('button').click();

  await expect
    .element(page.getByRole('dialog', { name: 'Image preview', exact: true }))
    .toBeAttached();
  await expect
    .element(
      page
        .getByRole('dialog', { name: 'Image preview', exact: true })
        .getByRole('img', { name: 'Mountain ridge' }),
    )
    .toHaveAttribute('src', '/full-size.jpg');
});

test('keeps the lightbox open when an image click is prevented', async () => {
  render(() => (
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
    </Lightbox>
  ));

  await page.getByRole('img', { name: 'Mountain ridge', exact: true }).click();

  await expect
    .element(page.getByRole('dialog', { name: 'Image preview', exact: true }))
    .toBeAttached();
});

test('lazily mounts, closes a click-to-close image, and restores focus', async () => {
  render(() => (
    <Lightbox portalled={false}>
      <LightboxTrigger>Open preview</LightboxTrigger>
      <LightboxPositioner>
        <LightboxContent aria-label="Image preview">
          <LightboxImage src="/full-size.jpg" alt="Mountain ridge" closeOnClick />
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  ));

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Open preview', exact: true }).click();
  await page.getByRole('img', { name: 'Mountain ridge', exact: true }).click();

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect
    .element(page.getByRole('button', { name: 'Open preview', exact: true }))
    .toBeFocused();
});

test('keeps its close icon accessible and viewport-fixed, then restores trigger focus', async () => {
  render(() => (
    <Lightbox portalled={false}>
      <LightboxTrigger>Open preview</LightboxTrigger>
      <LightboxPositioner>
        <LightboxContent aria-label="Image preview">
          <LightboxCloseIcon />
          <LightboxBody style={{ width: '240px', height: '160px' }}>
            <LightboxImage src="/full-size.jpg" alt="Mountain ridge" />
          </LightboxBody>
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  ));

  await page.getByRole('button', { name: 'Open preview', exact: true }).click();
  const closeIcon = page.getByRole('button', { name: 'Close image', exact: true });
  await expect.element(closeIcon).toBeFocused();
  await expect.element(closeIcon).toBeVisible();
  const dialog = screen.getByRole('dialog', { name: 'Image preview' });
  const button = screen.getByRole('button', { name: 'Close image' });
  expect(dialog.contains(button)).toBe(true);
  expect(getComputedStyle(dialog).scale).toBe('none');
  expect(getComputedStyle(dialog).translate).toBe('none');
  const rect = button.getBoundingClientRect();
  expect(rect.top).toBeCloseTo(16);
  expect(window.innerWidth - rect.right).toBeCloseTo(16);
  await expect
    .element(page.locator('[data-slot="lightbox-body"]'))
    .toHaveCSS('animation-name', 'moduix-lightbox-body-in');
  await closeIcon.press('Tab');
  await expect.element(closeIcon).toBeFocused();
  await closeIcon.click();

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect
    .element(page.getByRole('button', { name: 'Open preview', exact: true }))
    .toBeFocused();
});

test('exposes RootProvider state through useLightboxContext', async () => {
  function LightboxStatus() {
    const dialog = useLightboxContext();

    return <output>Open: {String(dialog().open)}</output>;
  }

  function ProviderLightbox() {
    const lightbox = useLightbox();

    return (
      <>
        <button type="button" onClick={() => lightbox().setOpen(true)}>
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

  render(() => <ProviderLightbox />);
  await page.getByRole('button', { name: 'Open preview', exact: true }).click();

  await expect
    .element(page.getByRole('dialog', { name: 'Image preview', exact: true }))
    .toBeAttached();
  await expect.element(page.getByText('Open: true')).toBeAttached();
});

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
  expect(backdrop!.classList.contains('bg-overlay')).toBe(false);
  expect([...positioner!.classList]).toEqual(expect.arrayContaining(['p-8']));
  expect(positioner!.classList.contains('p-4')).toBe(false);
  expect([...closeIcon!.classList]).toEqual(expect.arrayContaining(['size-10']));
  expect(closeIcon!.classList.contains('size-8')).toBe(false);
  expect([...content!.classList]).toEqual(expect.arrayContaining(['max-w-full']));
  expect(content!.classList.contains('max-w-[min(80vw,calc(100vw-2rem))]')).toBe(false);
  expect([...image!.classList]).toEqual(expect.arrayContaining(['rounded-none']));
  expect(image!.classList.contains('rounded-md')).toBe(false);

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

test('applies component-owned visual utilities to every visual part', async () => {
  render(() => (
    <Lightbox defaultOpen portalled={false}>
      <LightboxBackdrop />
      <LightboxPositioner>
        <LightboxContent aria-label="Image preview">
          <LightboxCloseIcon />
          <LightboxHeader>
            <LightboxTitle>Preview</LightboxTitle>
            <LightboxDescription>Description</LightboxDescription>
          </LightboxHeader>
          <LightboxBody>
            <LightboxImage src="/full-size.jpg" alt="Mountain ridge" />
            <LightboxGallery />
          </LightboxBody>
          <LightboxFooter>Footer</LightboxFooter>
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  ));

  expect([...document.querySelector('[data-slot="lightbox-backdrop"]')!.classList]).toEqual(
    expect.arrayContaining(['fixed', 'min-h-dvh', 'bg-overlay']),
  );
  expect([...document.querySelector('[data-slot="lightbox-positioner"]')!.classList]).toEqual(
    expect.arrayContaining(['grid', 'place-items-center', 'p-4']),
  );
  expect([...document.querySelector('[data-slot="lightbox-content"]')!.classList]).toEqual(
    expect.arrayContaining(['grid', 'w-fit', 'gap-3']),
  );
  expect([...document.querySelector('[data-slot="lightbox-close-icon"]')!.classList]).toEqual(
    expect.arrayContaining(['fixed', 'size-8']),
  );
  expect([...document.querySelector('[data-slot="lightbox-title"]')!.classList]).toEqual(
    expect.arrayContaining(['text-md', 'font-semibold']),
  );
  expect([...document.querySelector('[data-slot="lightbox-description"]')!.classList]).toEqual(
    expect.arrayContaining(['text-sm']),
  );
  expect([...document.querySelector('[data-slot="lightbox-header"]')!.classList]).toEqual(
    expect.arrayContaining(['grid', 'gap-1']),
  );
  expect([...document.querySelector('[data-slot="lightbox-body"]')!.classList]).toEqual(
    expect.arrayContaining(['grid', 'gap-3']),
  );
  expect([...document.querySelector('[data-slot="lightbox-footer"]')!.classList]).toEqual(
    expect.arrayContaining(['flex', 'items-center']),
  );
  expect([...document.querySelector('[data-slot="lightbox-image"]')!.classList]).toEqual(
    expect.arrayContaining(['block', 'rounded-md', 'shadow-lg']),
  );
  expect([...document.querySelector('[data-slot="lightbox-gallery"]')!.classList]).toEqual(
    expect.arrayContaining([
      'justify-self-center',
      '[&_[data-slot=carousel-indicator-group]]:mx-auto',
    ]),
  );
});

test('keeps the close-on-click marker aligned with its behavior', async () => {
  render(() => (
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
    </>
  ));

  await expect.element(page.locator('img[alt="Closes"]')).toHaveAttribute('data-close-on-click');
  await expect
    .element(page.locator('img[alt="Stays open"]'))
    .not.toHaveAttribute('data-close-on-click');
});

test.each([
  { name: 'empty currentSrc', currentSrc: '', override: undefined, selected: 'fallback' },
  {
    name: 'responsive source',
    currentSrc: '/responsive.jpg',
    override: undefined,
    selected: '/responsive.jpg',
  },
  {
    name: 'explicit override',
    currentSrc: '/responsive.jpg',
    override: '/full.jpg',
    selected: '/full.jpg',
  },
  { name: 'empty override exclusion', currentSrc: '/responsive.jpg', override: '', selected: null },
])('resolves Bind image with $name', async ({ currentSrc, override, selected }) => {
  const onImageSelect = rs.fn();
  function BoundImage() {
    let root!: HTMLDivElement;
    return (
      <>
        <div ref={(element) => (root = element)}>
          <button type="button">
            <img src="/thumbnail.jpg" alt="Bound image" />
          </button>
        </div>
        <Lightbox portalled={false}>
          <LightboxBind rootRef={() => root} selector="button" onImageSelect={onImageSelect} />
          <LightboxPositioner>
            <LightboxContent aria-label="Bound preview">Bound image preview</LightboxContent>
          </LightboxPositioner>
        </Lightbox>
      </>
    );
  }
  render(() => <BoundImage />);
  const image = screen.getByRole('img', { name: 'Bound image' }) as HTMLImageElement;
  Object.defineProperty(image, 'currentSrc', { configurable: true, value: currentSrc });
  if (override !== undefined) image.dataset.lightboxSrc = override;
  await page.getByRole('img', { name: 'Bound image', exact: true }).click();
  if (selected === null) {
    expect(onImageSelect).not.toHaveBeenCalled();
    await expect.element(page.getByRole('dialog')).toHaveCount(0);
  } else {
    expect(onImageSelect).toHaveBeenCalledExactlyOnceWith({
      src: selected === 'fallback' ? image.src : selected,
      alt: image.alt,
      element: image,
    });
    await expect
      .element(page.getByRole('dialog', { name: 'Bound preview', exact: true }))
      .toBeAttached();
  }
});