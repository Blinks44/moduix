import { expect, test } from '@rstest/core';
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
        asChild={(props) => <button {...props()}>Composed trigger</button>}
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