import {
  LightboxBackdrop,
  LightboxPositioner,
  LightboxContent,
  LightboxCloseIcon,
  LightboxImage,
  LightboxBind,
  Lightbox,
  type LightboxImageSelectDetails,
} from '@moduix/react/lightbox';
import { useRef, useState } from 'react';
import styles from '@/components/examples/lightbox/lightbox-bind-cms-content.module.css';

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

export default function CmsLightboxDemo() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [activeImage, setActiveImage] = useState(null as LightboxImageSelectDetails | null);
  return (
    <>
      <div ref={rootRef} className={styles.gallery}>
        {images.map((image) => (
          <button key={image.id} type="button" className={styles.galleryTrigger}>
            <img src={image.thumbnail} data-lightbox-src={image.src} alt={image.alt} />
          </button>
        ))}
      </div>

      <Lightbox>
        <LightboxBind rootRef={rootRef} selector="button" onImageSelect={setActiveImage} />
        <LightboxBackdrop />
        <LightboxPositioner>
          <LightboxCloseIcon />
          <LightboxContent aria-label={activeImage?.alt ?? 'Image preview'}>
            {activeImage ? (
              <LightboxImage src={activeImage.src} alt={activeImage.alt ?? ''} />
            ) : null}
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    </>
  );
}