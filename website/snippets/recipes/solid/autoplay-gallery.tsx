import { Carousel } from '@moduix/solid/carousel';
import { For, onCleanup, onMount } from 'solid-js';
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

function ResumeAutoplayWhenVisible(props: { onVisible: () => void }) {
  const resume = () => {
    if (document.visibilityState === 'visible') props.onVisible();
  };

  onMount(() => document.addEventListener('visibilitychange', resume));
  onCleanup(() => document.removeEventListener('visibilitychange', resume));

  return null;
}

export function AutoplayGallery() {
  return (
    <Carousel
      aria-label="Featured experiences"
      autoplay={{ delay: 3500 }}
      class={styles.gallery}
      loop
      padding="var(--autoplay-gallery-padding, var(--moduix-spacing-8))"
      slideCount={slides.length}
      slidesPerPage={1.12}
      spacing="var(--autoplay-gallery-spacing, var(--moduix-spacing-4))"
    >
      <Carousel.Context>
        {(api) => (
          <>
            <ResumeAutoplayWhenVisible onVisible={api().play} />
            <div class={styles.viewport}>
              <Carousel.ItemGroup
                class={styles.itemGroup}
                onTouchStart={api().pause}
                onWheel={(event) => {
                  if (event.deltaX !== 0) api().pause();
                }}
              >
                <For each={slides}>
                  {(slide, index) => (
                    <Carousel.Item
                      class={styles.item}
                      data-active={api().page === index() ? '' : undefined}
                      index={index()}
                      snapAlign="center"
                    >
                      <img class={styles.image} src={slide.src} alt={slide.alt} />
                      <div class={styles.copy}>
                        <span class={styles.category}>{slide.category}</span>
                        <h2 class={styles.title}>{slide.title}</h2>
                        <p class={styles.description}>{slide.description}</p>
                      </div>
                    </Carousel.Item>
                  )}
                </For>
              </Carousel.ItemGroup>

              <Carousel.Control class={styles.control}>
                <Carousel.PrevTrigger
                  class={styles.prevTrigger}
                  onClick={() => requestAnimationFrame(api().play)}
                />
                <Carousel.NextTrigger
                  class={styles.nextTrigger}
                  onClick={() => requestAnimationFrame(api().play)}
                />
              </Carousel.Control>
            </div>
          </>
        )}
      </Carousel.Context>

      <Carousel.Context>
        {(api) => (
          <Carousel.IndicatorGroup class={styles.indicatorGroup}>
            <For each={api().pageSnapPoints}>
              {(_, index) => (
                <Carousel.Indicator
                  class={styles.indicator}
                  data-playing={api().isPlaying ? '' : undefined}
                  index={index()}
                  onClick={() => requestAnimationFrame(api().play)}
                />
              )}
            </For>
          </Carousel.IndicatorGroup>
        )}
      </Carousel.Context>
    </Carousel>
  );
}