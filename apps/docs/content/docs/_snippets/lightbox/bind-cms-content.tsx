/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Lightbox, type LightboxImageSelectDetails } from '@moduix/react';
import { useRef, useState } from 'react';

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

export function CmsLightboxDemo() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [activeImage, setActiveImage] = useState(null as LightboxImageSelectDetails | null);
  return (
    <>
      <div ref={rootRef} className="lightbox-gallery">
        {images.map((image) => (
          <button key={image.id} type="button" className="lightbox-gallery-trigger">
            <img src={image.thumbnail} data-lightbox-src={image.src} alt={image.alt} />
          </button>
        ))}
      </div>

      <Lightbox lazyMount unmountOnExit>
        <Lightbox.Bind rootRef={rootRef} selector="button" onImageSelect={setActiveImage} />
        <Lightbox.Backdrop />
        <Lightbox.Positioner>
          <Lightbox.CloseIcon />
          <Lightbox.Content aria-label={activeImage?.alt ?? 'Image preview'}>
            {activeImage ? (
              <Lightbox.Image src={activeImage.src} alt={activeImage.alt ?? ''} />
            ) : null}
          </Lightbox.Content>
        </Lightbox.Positioner>
      </Lightbox>
    </>
  );
}

//#endregion