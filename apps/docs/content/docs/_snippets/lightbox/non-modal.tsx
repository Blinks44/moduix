/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Lightbox } from '@moduix/react';

const images = [
  {
    id: 'mountain',
    thumbnail:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90',
    alt: 'Mountain ridge at sunset',
  },
  {
    id: 'sea',
    thumbnail:
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90',
    alt: 'Sea cliffs under a cloudy sky',
  },
  {
    id: 'forest',
    thumbnail:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90',
    alt: 'Road through a green forest',
  },
];

export function NonModalLightboxDemo() {
  return (
    <>
      <Lightbox modal={false} trapFocus={false} preventScroll={false}>
        <Lightbox.Trigger className="lightbox-button">Open non-modal lightbox</Lightbox.Trigger>
        <Lightbox.Backdrop />
        <Lightbox.Positioner>
          <Lightbox.CloseIcon />
          <Lightbox.Content aria-label={images[2].alt}>
            <Lightbox.Image src={images[2].src} alt={images[2].alt} />
          </Lightbox.Content>
        </Lightbox.Positioner>
      </Lightbox>
      <button type="button" className="lightbox-button">
        Background action
      </button>
    </>
  );
}

//#endregion