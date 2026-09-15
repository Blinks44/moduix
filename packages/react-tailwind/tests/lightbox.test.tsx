import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRef, useState } from 'react';
import { Lightbox, type LightboxImageSelectDetails, useLightbox, useLightboxContext } from '../src';

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
          <Lightbox.Bind rootRef={rootRef} selector="button" onImageSelect={setImage} />
          <Lightbox.Positioner>
            <Lightbox.Content aria-label="Image preview">
              {image ? <Lightbox.Image src={image.src} alt={image.alt ?? ''} /> : null}
            </Lightbox.Content>
          </Lightbox.Positioner>
        </Lightbox>
      </>
    );
  }

  render(<BoundLightbox />);
  fireEvent.click(screen.getByRole('button'));

  expect(await screen.findByRole('dialog', { name: 'Image preview' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Mountain ridge' })).toHaveAttribute(
    'src',
    '/full-size.jpg',
  );
});

test('keeps the lightbox open when an image click is prevented', () => {
  render(
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
    </Lightbox>,
  );

  fireEvent.click(screen.getByRole('img', { name: 'Mountain ridge' }));

  expect(screen.getByRole('dialog', { name: 'Image preview' })).toBeInTheDocument();
});

test('closes a click-to-close image and restores focus to its trigger', async () => {
  render(
    <Lightbox portalled={false}>
      <Lightbox.Trigger>Open preview</Lightbox.Trigger>
      <Lightbox.Positioner>
        <Lightbox.Content aria-label="Image preview">
          <Lightbox.Image src="/full-size.jpg" alt="Mountain ridge" closeOnClick />
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Lightbox>,
  );

  const trigger = screen.getByRole('button', { name: 'Open preview' });
  fireEvent.click(trigger);
  fireEvent.click(await screen.findByRole('img', { name: 'Mountain ridge' }));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

test('closes from its accessible close icon and restores focus to its trigger', async () => {
  render(
    <Lightbox portalled={false}>
      <Lightbox.Trigger>Open preview</Lightbox.Trigger>
      <Lightbox.Positioner>
        <Lightbox.CloseIcon />
        <Lightbox.Content aria-label="Image preview">
          <Lightbox.Image src="/full-size.jpg" alt="Mountain ridge" />
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Lightbox>,
  );

  const trigger = screen.getByRole('button', { name: 'Open preview' });
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

    return <output>Open: {String(dialog.open)}</output>;
  }

  function ProviderLightbox() {
    const lightbox = useLightbox();

    return (
      <>
        <button type="button" onClick={() => lightbox.setOpen(true)}>
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

  render(<ProviderLightbox />);
  fireEvent.click(screen.getByRole('button', { name: 'Open preview' }));

  expect(await screen.findByRole('dialog', { name: 'Image preview' })).toBeInTheDocument();
  expect(screen.getByText('Open: true')).toBeInTheDocument();
});

test('mounts lazy content on first open and unmounts it after close', async () => {
  render(
    <Lightbox lazyMount unmountOnExit portalled={false}>
      <Lightbox.Trigger>Open preview</Lightbox.Trigger>
      <Lightbox.Positioner>
        <Lightbox.Content aria-label="Image preview">
          <Lightbox.Image src="/full-size.jpg" alt="Mountain ridge" closeOnClick />
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Lightbox>,
  );

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Open preview' }));
  fireEvent.click(await screen.findByRole('img', { name: 'Mountain ridge' }));

  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

test('merges consumer utilities over Tailwind defaults', () => {
  render(
    <Lightbox defaultOpen portalled={false}>
      <Lightbox.Backdrop className="bg-red-500" />
      <Lightbox.Positioner className="p-8">
        <Lightbox.CloseIcon className="size-10" />
        <Lightbox.Content className="max-w-full" aria-label="Image preview">
          <Lightbox.Image className="rounded-none" src="/full-size.jpg" alt="Mountain ridge" />
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Lightbox>,
  );

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
  render(
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
    </Lightbox>,
  );

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
  render(
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
    </>,
  );

  expect(screen.getByRole('img', { name: 'Closes' })).toHaveAttribute('data-close-on-click');
  expect(screen.getByRole('img', { name: 'Stays open' })).not.toHaveAttribute(
    'data-close-on-click',
  );
});