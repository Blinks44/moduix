import { Button, Lightbox } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

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

export default function NonModalLightboxDemo() {
  const [backgroundActions, setBackgroundActions] = useState(0);

  return (
    <>
      <Lightbox modal={false}>
        <Lightbox.Trigger className="lightbox-button">Open non-modal lightbox</Lightbox.Trigger>
        <Lightbox.Positioner>
          <Lightbox.CloseIcon />
          <Lightbox.Content aria-label={images[2].alt}>
            <Lightbox.Image src={images[2].src} alt={images[2].alt} />
          </Lightbox.Content>
        </Lightbox.Positioner>
      </Lightbox>
      <PreviewMeta>
        <output>Background actions: {backgroundActions}</output>
        <Button variant="outline" onClick={() => setBackgroundActions((value) => value + 1)}>
          Run background action
        </Button>
      </PreviewMeta>
    </>
  );
}