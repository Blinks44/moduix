<script lang="ts">
  import { onMount } from 'svelte';
  import {
    CarouselRootProvider,
    CarouselControl,
    CarouselIndicator,
    CarouselIndicatorGroup,
    CarouselItem,
    CarouselItemGroup,
    CarouselNextTrigger,
    CarouselPrevTrigger,
    useCarousel,
  } from '@/components/ui/carousel';
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

  const id = $props.id();
  const carousel = useCarousel({
    id,
    autoplay: { delay: 3500 },
    loop: true,
    slideCount: slides.length,
    slidesPerPage: 1.12,
    padding: 'var(--autoplay-gallery-padding, var(--moduix-spacing-8))',
    spacing: 'var(--autoplay-gallery-spacing, var(--moduix-spacing-4))',
  });
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') carousel().play();
  };
  const resumeAutoplay = () => requestAnimationFrame(() => carousel().play());
  const handleWheel = (event: WheelEvent) => {
    if (event.deltaX !== 0) carousel().pause();
  };
  onMount(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  });
</script>

<CarouselRootProvider value={carousel} aria-label="Featured experiences" class={styles.gallery}>
  <div class={styles.viewport}>
    <CarouselItemGroup
      class={styles.itemGroup}
      ontouchstart={() => carousel().pause()}
      onwheel={handleWheel}
    >
      {#each slides as slide, index (slide.id)}
        <CarouselItem
          class={styles.item}
          data-active={carousel().page === index ? '' : undefined}
          {index}
          snapAlign="center"
        >
          <img class={styles.image} src={slide.src} alt={slide.alt} />
          <div class={styles.copy}>
            <span class={styles.category}>{slide.category}</span>
            <h2 class={styles.title}>{slide.title}</h2>
            <p class={styles.description}>{slide.description}</p>
          </div>
        </CarouselItem>
      {/each}
    </CarouselItemGroup>
    <CarouselControl class={styles.control}>
      <CarouselPrevTrigger class={styles.prevTrigger} onclick={resumeAutoplay} />
      <CarouselNextTrigger class={styles.nextTrigger} onclick={resumeAutoplay} />
    </CarouselControl>
  </div>
  <CarouselIndicatorGroup class={styles.indicatorGroup}>
    {#each carousel().pageSnapPoints as _, index (index)}
      <CarouselIndicator
        class={styles.indicator}
        data-playing={carousel().isPlaying ? '' : undefined}
        {index}
        onclick={resumeAutoplay}
      />
    {/each}
  </CarouselIndicatorGroup>
</CarouselRootProvider>