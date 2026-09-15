import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Lightbox, type LightboxImageSelectDetails, useLightbox, useLightboxContext } from '../src';

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
          <Lightbox.Bind
            rootRef={() => rootRef}
            selector="button"
            onImageSelect={(details) => setImage(details)}
          />
          <Lightbox.Positioner>
            <Lightbox.Content aria-label="Image preview">
              {image() ? <Lightbox.Image src={image()!.src} alt={image()!.alt ?? ''} /> : null}
            </Lightbox.Content>
          </Lightbox.Positioner>
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
      <Lightbox.Positioner>
        <Lightbox.Content aria-label="Image preview">
          <Lightbox.Image
            src="/full-size.jpg"
            alt="Mountain ridge"
            closeOnClick
            onClick={(event) => event.preventDefault()}
          />
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Lightbox>
  ));

  fireEvent.click(screen.getByRole('img', { name: 'Mountain ridge' }));

  expect(screen.getByRole('dialog', { name: 'Image preview' })).toBeInTheDocument();
});

test('closes a click-to-close image and restores focus to its trigger', async () => {
  render(() => (
    <Lightbox portalled={false}>
      <Lightbox.Trigger>Open preview</Lightbox.Trigger>
      <Lightbox.Positioner>
        <Lightbox.Content aria-label="Image preview">
          <Lightbox.Image src="/full-size.jpg" alt="Mountain ridge" closeOnClick />
        </Lightbox.Content>
      </Lightbox.Positioner>
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
      <Lightbox.Trigger>Open preview</Lightbox.Trigger>
      <Lightbox.Positioner>
        <Lightbox.CloseIcon />
        <Lightbox.Content aria-label="Image preview">
          <Lightbox.Image src="/full-size.jpg" alt="Mountain ridge" />
        </Lightbox.Content>
      </Lightbox.Positioner>
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
        <Lightbox.RootProvider value={lightbox} portalled={false}>
          <Lightbox.Positioner>
            <Lightbox.Content aria-label="Image preview">
              <LightboxStatus />
            </Lightbox.Content>
          </Lightbox.Positioner>
        </Lightbox.RootProvider>
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
      <Lightbox.Trigger>Open preview</Lightbox.Trigger>
      <Lightbox.Positioner>
        <Lightbox.Content aria-label="Image preview">
          <Lightbox.Image src="/full-size.jpg" alt="Mountain ridge" closeOnClick />
        </Lightbox.Content>
      </Lightbox.Positioner>
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
      <Lightbox.Trigger ref={(element) => (triggerRef = element)}>Open preview</Lightbox.Trigger>
      <Lightbox.Trigger
        ref={(element) => (composedTriggerRef = element)}
        asChild={(props) => (
          <button {...props()} type="button">
            Composed trigger
          </button>
        )}
      />
      <Lightbox.Backdrop ref={(element) => (backdropRef = element)} />
      <Lightbox.Positioner ref={(element) => (positionerRef = element)}>
        <Lightbox.CloseIcon ref={(element) => (closeIconRef = element)} />
        <Lightbox.Content ref={(element) => (contentRef = element)}>
          <Lightbox.Header ref={(element) => (headerRef = element)}>
            <Lightbox.Title ref={(element) => (titleRef = element)}>Preview</Lightbox.Title>
            <Lightbox.Description ref={(element) => (descriptionRef = element)}>
              Description
            </Lightbox.Description>
          </Lightbox.Header>
          <Lightbox.Body ref={(element) => (bodyRef = element)}>
            <Lightbox.Image
              ref={(element) => (imageRef = element)}
              src="/full-size.jpg"
              alt="Mountain ridge"
            />
            <Lightbox.Gallery ref={(element) => (galleryRef = element)} />
          </Lightbox.Body>
          <Lightbox.Footer ref={(element) => (footerRef = element)} />
          <Lightbox.CloseTrigger ref={(element) => (closeTriggerRef = element)}>
            Close
          </Lightbox.CloseTrigger>
        </Lightbox.Content>
      </Lightbox.Positioner>
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
      <Lightbox.Backdrop class="bg-red-500" />
      <Lightbox.Positioner class="p-8">
        <Lightbox.CloseIcon class="size-10" />
        <Lightbox.Content class="max-w-full" aria-label="Image preview">
          <Lightbox.Image class="rounded-none" src="/full-size.jpg" alt="Mountain ridge" />
        </Lightbox.Content>
      </Lightbox.Positioner>
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
      <Lightbox.Backdrop />
      <Lightbox.Positioner>
        <Lightbox.CloseIcon />
        <Lightbox.Content aria-label="Image preview">
          <Lightbox.Header>
            <Lightbox.Title>Preview</Lightbox.Title>
            <Lightbox.Description>Description</Lightbox.Description>
          </Lightbox.Header>
          <Lightbox.Body>
            <Lightbox.Image src="/full-size.jpg" alt="Mountain ridge" />
            <Lightbox.Gallery />
          </Lightbox.Body>
          <Lightbox.Footer>Footer</Lightbox.Footer>
        </Lightbox.Content>
      </Lightbox.Positioner>
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
        <Lightbox.Positioner>
          <Lightbox.Content aria-label="First preview">
            <Lightbox.Image
              alt="Closes"
              closeOnClick
              data-close-on-click={undefined}
              src="/first.jpg"
            />
          </Lightbox.Content>
        </Lightbox.Positioner>
      </Lightbox>
      <Lightbox defaultOpen portalled={false}>
        <Lightbox.Positioner>
          <Lightbox.Content aria-label="Second preview">
            <Lightbox.Image alt="Stays open" data-close-on-click="" src="/second.jpg" />
          </Lightbox.Content>
        </Lightbox.Positioner>
      </Lightbox>
    </>
  ));

  expect(screen.getByRole('img', { name: 'Closes' })).toHaveAttribute('data-close-on-click');
  expect(screen.getByRole('img', { name: 'Stays open' })).not.toHaveAttribute(
    'data-close-on-click',
  );
});