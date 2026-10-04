import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@solidjs/testing-library';
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
  fireEvent.click(image);
  expect(calls).toEqual([payload, image]);
  await waitFor(() => {
    expect(screen.queryByRole('dialog', { name: 'Image preview' }) !== null).toBe(prevented);
  });
});

test('rebinds the gallery root and removes delegated listeners on cleanup', () => {
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
  fireEvent.click(first.querySelector('button')!);
  const firstSrc = first.querySelector('img')!.src;
  const secondSrc = second.querySelector('img')!.src;
  expect(calls).toEqual([firstSrc]);
  setUseSecond(true);
  fireEvent.click(first.querySelector('button')!);
  fireEvent.click(second.querySelector('button')!);
  expect(calls).toEqual([firstSrc, secondSrc]);
  const detachedButton = second.querySelector('button')!;
  unmount();
  fireEvent.click(detachedButton);
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
  fireEvent.click(screen.getByRole('button'));

  const dialog = await screen.findByRole('dialog', { name: 'Image preview' });
  expect(dialog).toBeInTheDocument();
  expect(within(dialog).getByRole('img', { name: 'Mountain ridge' })).toHaveAttribute(
    'src',
    '/full-size.jpg',
  );
});

test('keeps the lightbox open when an image click is prevented', () => {
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

  fireEvent.click(screen.getByRole('img', { name: 'Mountain ridge' }));

  expect(screen.getByRole('dialog', { name: 'Image preview' })).toBeInTheDocument();
});

test('closes a click-to-close image and restores focus to its trigger', async () => {
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

  const trigger = screen.getByRole('button', { name: 'Open preview' });
  trigger.focus();
  fireEvent.click(trigger);
  fireEvent.click(await screen.findByRole('img', { name: 'Mountain ridge' }));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

test('closes from its accessible close icon and restores focus to its trigger', async () => {
  render(() => (
    <Lightbox portalled={false}>
      <LightboxTrigger>Open preview</LightboxTrigger>
      <LightboxPositioner>
        <LightboxCloseIcon />
        <LightboxContent aria-label="Image preview">
          <LightboxImage src="/full-size.jpg" alt="Mountain ridge" />
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  ));

  const trigger = screen.getByRole('button', { name: 'Open preview' });
  trigger.focus();
  fireEvent.click(trigger);
  fireEvent.click(await screen.findByRole('button', { name: 'Close image' }));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
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
  fireEvent.click(screen.getByRole('button', { name: 'Open preview' }));

  expect(await screen.findByRole('dialog', { name: 'Image preview' })).toBeInTheDocument();
  expect(screen.getByText('Open: true')).toBeInTheDocument();
});

test('mounts lazy content on first open and unmounts it after close', async () => {
  render(() => (
    <Lightbox lazyMount unmountOnExit portalled={false}>
      <LightboxTrigger>Open preview</LightboxTrigger>
      <LightboxPositioner>
        <LightboxContent aria-label="Image preview">
          <LightboxImage src="/full-size.jpg" alt="Mountain ridge" closeOnClick />
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  ));

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Open preview' }));
  fireEvent.click(await screen.findByRole('img', { name: 'Mountain ridge' }));

  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
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
        <LightboxCloseIcon ref={(element) => (closeIconRef = element)} />
        <LightboxContent ref={(element) => (contentRef = element)}>
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

  expect(triggerRef).toHaveAttribute('data-slot', 'lightbox-trigger');
  expect(backdropRef).toHaveAttribute('data-slot', 'lightbox-backdrop');
  expect(positionerRef).toHaveAttribute('data-slot', 'lightbox-positioner');
  expect(contentRef).toHaveAttribute('data-slot', 'lightbox-content');
  expect(titleRef).toHaveAttribute('data-slot', 'lightbox-title');
  expect(descriptionRef).toHaveAttribute('data-slot', 'lightbox-description');
  expect(closeTriggerRef).toHaveAttribute('data-slot', 'lightbox-close-trigger');
  expect(imageRef).toHaveAttribute('data-slot', 'lightbox-image');
  expect(galleryRef).toHaveAttribute('data-slot', 'lightbox-gallery');
  expect(headerRef).toHaveAttribute('data-slot', 'lightbox-header');
  expect(bodyRef).toHaveAttribute('data-slot', 'lightbox-body');
  expect(footerRef).toHaveAttribute('data-slot', 'lightbox-footer');
  expect(composedTriggerRef).toBeUndefined();
  expect(closeIconRef).toBeUndefined();
});

test('merges consumer utilities over Tailwind defaults', () => {
  render(() => (
    <Lightbox defaultOpen portalled={false}>
      <LightboxBackdrop class="bg-red-500" />
      <LightboxPositioner class="p-8">
        <LightboxCloseIcon class="size-10" />
        <LightboxContent class="max-w-full" aria-label="Image preview">
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

  expect(backdrop).toHaveClass('bg-red-500');
  expect(backdrop).not.toHaveClass('bg-overlay');
  expect(positioner).toHaveClass('p-8');
  expect(positioner).not.toHaveClass('p-4');
  expect(closeIcon).toHaveClass('size-10');
  expect(closeIcon).not.toHaveClass('size-8');
  expect(content).toHaveClass('max-w-full');
  expect(content).not.toHaveClass('max-w-[min(80vw,calc(100vw-2rem))]');
  expect(image).toHaveClass('rounded-none');
  expect(image).not.toHaveClass('rounded-md');
});

test('applies component-owned visual utilities to every visual part', () => {
  render(() => (
    <Lightbox defaultOpen portalled={false}>
      <LightboxBackdrop />
      <LightboxPositioner>
        <LightboxCloseIcon />
        <LightboxContent aria-label="Image preview">
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

  expect(document.querySelector('[data-slot="lightbox-backdrop"]')).toHaveClass(
    'fixed',
    'min-h-dvh',
    'bg-overlay',
  );
  expect(document.querySelector('[data-slot="lightbox-positioner"]')).toHaveClass(
    'grid',
    'place-items-center',
    'p-4',
  );
  expect(document.querySelector('[data-slot="lightbox-content"]')).toHaveClass(
    'grid',
    'w-fit',
    'gap-3',
  );
  expect(document.querySelector('[data-slot="lightbox-close-icon"]')).toHaveClass(
    'fixed',
    'size-8',
  );
  expect(document.querySelector('[data-slot="lightbox-title"]')).toHaveClass(
    'text-md',
    'font-semibold',
  );
  expect(document.querySelector('[data-slot="lightbox-description"]')).toHaveClass('text-sm');
  expect(document.querySelector('[data-slot="lightbox-header"]')).toHaveClass('grid', 'gap-1');
  expect(document.querySelector('[data-slot="lightbox-body"]')).toHaveClass('grid', 'gap-3');
  expect(document.querySelector('[data-slot="lightbox-footer"]')).toHaveClass(
    'flex',
    'items-center',
  );
  expect(document.querySelector('[data-slot="lightbox-image"]')).toHaveClass(
    'block',
    'rounded-md',
    'shadow-lg',
  );
  expect(document.querySelector('[data-slot="lightbox-gallery"]')).toHaveClass(
    'justify-self-center',
    '[&_[data-slot=carousel-indicator-group]]:mx-auto',
  );
});

test('keeps the close-on-click marker aligned with its behavior', () => {
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

  expect(screen.getByRole('img', { name: 'Closes' })).toHaveAttribute('data-close-on-click');
  expect(screen.getByRole('img', { name: 'Stays open' })).not.toHaveAttribute(
    'data-close-on-click',
  );
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
            <LightboxContent aria-label="Bound preview" />
          </LightboxPositioner>
        </Lightbox>
      </>
    );
  }
  render(() => <BoundImage />);
  const image = screen.getByRole('img', { name: 'Bound image' }) as HTMLImageElement;
  Object.defineProperty(image, 'currentSrc', { configurable: true, value: currentSrc });
  if (override !== undefined) image.dataset.lightboxSrc = override;
  fireEvent.click(image);
  if (selected === null) {
    expect(onImageSelect).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  } else {
    expect(onImageSelect).toHaveBeenCalledExactlyOnceWith({
      src: selected === 'fallback' ? image.src : selected,
      alt: image.alt,
      element: image,
    });
    expect(await screen.findByRole('dialog', { name: 'Bound preview' })).toBeInTheDocument();
  }
});