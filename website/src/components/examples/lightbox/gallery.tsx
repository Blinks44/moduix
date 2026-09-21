import {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
} from '@moduix/react/carousel';
import {
  LightboxTrigger,
  LightboxBackdrop,
  LightboxPositioner,
  LightboxContent,
  LightboxCloseIcon,
  LightboxGallery,
  Lightbox,
} from '@moduix/react/lightbox';
import { useState } from 'react';
import styles from '@/components/examples/lightbox/lightbox-gallery.module.css';

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

export default function GalleryLightboxDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];
  return (
    <Lightbox
      onTriggerValueChange={(details) => {
        const nextIndex = images.findIndex((image) => image.id === details.value);
        setActiveIndex(nextIndex >= 0 ? nextIndex : 0);
      }}
    >
      <div className={styles.gallery}>
        {images.map((image) => (
          <LightboxTrigger key={image.id} value={image.id} asChild>
            <button type="button" className={styles.galleryTrigger}>
              <img src={image.thumbnail} alt={image.alt} />
            </button>
          </LightboxTrigger>
        ))}
      </div>

      <LightboxBackdrop />
      <LightboxPositioner>
        <LightboxCloseIcon />
        <LightboxContent aria-label={activeImage.alt}>
          <LightboxGallery>
            <Carousel
              aria-label="Server-driven image carousel"
              page={activeIndex}
              onPageChange={(details) => setActiveIndex(details.page)}
              slideCount={images.length}
            >
              <CarouselControl>
                <CarouselPrevTrigger />
                <CarouselItemGroup>
                  {images.map((image, index) => (
                    <CarouselItem key={image.id} index={index}>
                      <img src={image.src} alt={image.alt} />
                    </CarouselItem>
                  ))}
                </CarouselItemGroup>
                <CarouselNextTrigger />
              </CarouselControl>

              <CarouselIndicatorGroup>
                {images.map((image, index) => (
                  <CarouselIndicator key={image.id} index={index}>
                    <img src={image.thumbnail} alt="" />
                  </CarouselIndicator>
                ))}
              </CarouselIndicatorGroup>
            </Carousel>
          </LightboxGallery>
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  );
}