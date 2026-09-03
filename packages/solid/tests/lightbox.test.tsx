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
        asChild={(props) => <button {...props()}>Composed trigger</button>}
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