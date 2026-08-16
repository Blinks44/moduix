import { Carousel } from '@moduix/react/carousel';
import { useEffect } from 'react';
import styles from './autoplay-gallery.module.css';

const slides = [
  {
    id: 'workspaces',
    category: 'Workspaces',
    title: 'Space to make ideas happen',
    description: 'Quiet rooms, shared tables, and a place to reset between meetings.',
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85',
    alt: 'A bright office with tables, chairs, and plants.',
  },
  {
    id: 'outdoors',
    category: 'Outdoors',
    title: 'Find your next wide-open weekend',
    description: 'A little fresh air, a long trail, and views worth slowing down for.',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
    alt: 'Snow-covered mountains under a clear sky.',
  },
  {
    id: 'wellbeing',
    category: 'Wellbeing',
    title: 'Make room for feeling better',
    description: 'Thoughtful care and small rituals that keep the everyday in balance.',
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    alt: 'A calm spa room with warm light and a treatment bed.',
  },
  {
    id: 'community',
    category: 'Community',
    title: 'The good part is doing it together',
    description: 'Make time for the people, places, and events that bring energy back.',
    src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=85',
    alt: 'Friends enjoying an outdoor gathering at sunset.',
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
      padding="var(--moduix-spacing-8)"
      slideCount={slides.length}
      slidesPerPage={1.12}
      spacing="var(--moduix-spacing-4)"
    >
      <Carousel.Context>
        {(api) => (
          <>
            <ResumeAutoplayWhenVisible onVisible={api.play} />
            <div className={styles.viewport}>
              <Carousel.ItemGroup className={styles.itemGroup}>
                {slides.map((slide, index) => (
                  <Carousel.Item
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
                  </Carousel.Item>
                ))}
              </Carousel.ItemGroup>

              <Carousel.Control className={styles.control}>
                <Carousel.PrevTrigger
                  className={styles.prevTrigger}
                  onClick={() => requestAnimationFrame(api.play)}
                />
                <Carousel.NextTrigger
                  className={styles.nextTrigger}
                  onClick={() => requestAnimationFrame(api.play)}
                />
              </Carousel.Control>
            </div>
          </>
        )}
      </Carousel.Context>

      <Carousel.Context>
        {(api) => (
          <Carousel.IndicatorGroup className={styles.indicatorGroup}>
            {api.pageSnapPoints.map((_, index) => (
              <Carousel.Indicator
                key={index}
                className={styles.indicator}
                data-playing={api.isPlaying ? '' : undefined}
                index={index}
                onClick={() => requestAnimationFrame(api.play)}
              />
            ))}
          </Carousel.IndicatorGroup>
        )}
      </Carousel.Context>
    </Carousel>
  );
}