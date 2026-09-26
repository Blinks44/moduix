import { Button } from '@moduix/react/button';
import {
  LightboxTrigger,
  LightboxBackdrop,
  LightboxPositioner,
  LightboxContent,
  LightboxTitle,
  LightboxCloseIcon,
  LightboxImage,
  Lightbox,
} from '@moduix/react/lightbox';
import { useRef, useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/lightbox/lightbox-focus-and-ids.module.css';

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

export default function FocusLightboxDemo() {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [focusReturned, setFocusReturned] = useState(false);

  return (
    <>
      <Lightbox
        initialFocusEl={() => closeRef.current}
        finalFocusEl={() => triggerRef.current}
        onOpenChange={(details) => {
          if (details.open) {
            setFocusReturned(false);
          }
        }}
        ids={{
          content: 'lightbox-focus-content',
          title: 'lightbox-focus-title',
        }}
      >
        <LightboxTrigger className={styles.button}>Open focus-managed lightbox</LightboxTrigger>
        <LightboxBackdrop />
        <LightboxPositioner>
          <LightboxCloseIcon ref={closeRef} />
          <LightboxContent>
            <LightboxTitle className={styles.status}>Mountain ridge at sunset</LightboxTitle>
            <LightboxImage src={images[0].src} alt={images[0].alt} />
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
      <PreviewMeta>
        <output>
          {focusReturned
            ? 'Focus returned to this button.'
            : 'Close the lightbox to return focus here.'}
        </output>
        <Button
          ref={triggerRef}
          className={styles.focusTarget}
          data-focus-returned={focusReturned ? '' : undefined}
          onFocus={() => setFocusReturned(true)}
        >
          Focus returns here
        </Button>
      </PreviewMeta>
    </>
  );
}