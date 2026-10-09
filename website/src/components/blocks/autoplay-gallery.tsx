'use client';

import { useEffect } from 'react';
import {
  Carousel,
  CarouselContext,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
} from '@/registry/react/ui/carousel';
import styles from './autoplay-gallery.module.css';

const slides = [
  {
    id: 'workspaces',
    category: 'Workspaces',
    title: 'Workspaces for teams',
    description: 'Private offices and shared desks with meeting rooms and Wi-Fi.',
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85',
    alt: 'A bright office with tables, chairs, and plants.',
  },
  {
    id: 'outdoors',
    category: 'Outdoors',
    title: 'Mountain trails',
    description: 'Day hikes and weekend routes through the mountains.',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
    alt: 'Snow-covered mountains under a clear sky.',
  },
  {
    id: 'wellbeing',
    category: 'Wellbeing',
    title: 'Spa appointments',
    description: 'Book a massage or a treatment at a local spa.',
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    alt: 'A lotion bottle, rolled towels, and pink flowers.',
  },
  {
    id: 'community',
    category: 'Community',
    title: 'Local events',
    description: 'Find outdoor concerts, meetups, and other events nearby.',
    src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=85',
    alt: 'People gathered on a patio under string lights.',
  },
];

function ResumeAutoplayWhenVisible({ onVisible }: { onVisible: () => void }) {
  useEffect(() => {
    const resume = () => {
      if (document.visibilityState === 'visible') onVisible();
    };

    document.addEventListener('visibilitychange', resume);
    return () => document.removeEventListener('visibilitychange', resume);
  }, [onVisible]);

  return null;
}

export function AutoplayGallery() {
  return (
    <Carousel
      aria-label="Featured experiences"
      autoplay={{ delay: 3500 }}
      className={styles.gallery}
      loop
      padding="var(--autoplay-gallery-padding, var(--moduix-spacing-8))"
      slideCount={slides.length}
      slidesPerPage={1.12}
      spacing="var(--autoplay-gallery-spacing, var(--moduix-spacing-4))"
    >
      <CarouselContext>
        {(api) => (
          <>
            <ResumeAutoplayWhenVisible onVisible={api.play} />
            <div className={styles.viewport}>
              <CarouselItemGroup
                className={styles.itemGroup}
                onTouchStart={api.pause}
                onWheel={(event) => {
                  if (event.deltaX !== 0) api.pause();
                }}
              >
                {slides.map((slide, index) => (
                  <CarouselItem
                    key={slide.id}
                    className={styles.item}
                    data-active={api.page === index ? '' : undefined}
                    index={index}
                    snapAlign="center"
                  >
                    <img className={styles.image} src={slide.src} alt={slide.alt} />
                    <div className={styles.copy}>
                      <span className={styles.category}>{slide.category}</span>
                      <h2 className={styles.title}>{slide.title}</h2>
                      <p className={styles.description}>{slide.description}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselItemGroup>

              <CarouselControl className={styles.control}>
                <CarouselPrevTrigger
                  className={styles.prevTrigger}
                  onClick={() => requestAnimationFrame(api.play)}
                />
                <CarouselNextTrigger
                  className={styles.nextTrigger}
                  onClick={() => requestAnimationFrame(api.play)}
                />
              </CarouselControl>
            </div>
          </>
        )}
      </CarouselContext>

      <CarouselContext>
        {(api) => (
          <CarouselIndicatorGroup className={styles.indicatorGroup}>
            {api.pageSnapPoints.map((_, index) => (
              <CarouselIndicator
                key={index}
                className={styles.indicator}
                data-playing={api.isPlaying ? '' : undefined}
                index={index}
                onClick={() => requestAnimationFrame(api.play)}
              />
            ))}
          </CarouselIndicatorGroup>
        )}
      </CarouselContext>
    </Carousel>
  );
}