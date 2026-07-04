/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Carousel, Lightbox } from '@moduix/react';
import { useState } from 'react';

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

export function GalleryLightboxDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];
  return (
    <Lightbox
      onTriggerValueChange={(details) => {
        const nextIndex = images.findIndex((image) => image.id === details.value);
        setActiveIndex(nextIndex >= 0 ? nextIndex : 0);
      }}
    >
      <div className="lightbox-gallery">
        {images.map((image) => (
          <Lightbox.Trigger key={image.id} value={image.id} asChild>
            <button type="button" className="lightbox-gallery-trigger">
              <img src={image.thumbnail} alt={image.alt} />
            </button>
          </Lightbox.Trigger>
        ))}
      </div>

      <Lightbox.Backdrop />
      <Lightbox.Positioner>
        <Lightbox.CloseIcon />
        <Lightbox.Content aria-label={activeImage.alt}>
          <Lightbox.Gallery>
            <Carousel.Root
              page={activeIndex}
              onPageChange={(details) => setActiveIndex(details.page)}
              slideCount={images.length}
            >
              <Carousel.Control>
                <Carousel.PrevTrigger />
                <Carousel.ItemGroup aria-label="Server-driven image carousel">
                  {images.map((image, index) => (
                    <Carousel.Item key={image.id} index={index}>
                      <img src={image.src} alt={image.alt} />
                    </Carousel.Item>
                  ))}
                </Carousel.ItemGroup>
                <Carousel.NextTrigger />
              </Carousel.Control>

              <Carousel.IndicatorGroup>
                {images.map((image, index) => (
                  <Carousel.Indicator key={image.id} index={index}>
                    <img src={image.thumbnail} alt="" />
                  </Carousel.Indicator>
                ))}
              </Carousel.IndicatorGroup>
            </Carousel.Root>
          </Lightbox.Gallery>
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Lightbox>
  );
}

//#endregion