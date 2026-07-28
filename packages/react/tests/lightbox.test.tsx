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