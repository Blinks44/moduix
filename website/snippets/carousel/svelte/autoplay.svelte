<script lang="ts">
  import {
    Carousel,
    CarouselAutoplayIndicator,
    CarouselAutoplayTrigger,
    CarouselContext,
    CarouselControl,
    CarouselIndicators,
    CarouselItem,
    CarouselItemGroup,
    CarouselNextTrigger,
    CarouselPrevTrigger,
  } from '@moduix/svelte/carousel';
  import styles from '@/components/examples/carousel/carousel-autoplay.module.css';

  const slides = [
    {
      id: 'fjord',
      src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1280&q=80',
      alt: 'A lakeside landscape with mountains and warm sunset light.',
    },
    {
      id: 'coast',
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1280&q=80',
      alt: 'Ocean waves rolling onto a sandy beach.',
    },
    {
      id: 'village',
      src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1280&q=80',
      alt: 'A colorful hillside town on the coast.',
    },
    {
      id: 'forest',
      src: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1280&q=80',
      alt: 'A misty green forest with tall trees.',
    },
    {
      id: 'desert',
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=80',
      alt: 'Golden sand dunes under a bright sky.',
    },
  ];
</script>

<Carousel
  class={styles.root}
  aria-label="Autoplay gallery"
  autoplay={{ delay: 3500 }}
  loop
  slideCount={slides.length}
>
  <CarouselContext>
    {#snippet render(api)}
      <CarouselItemGroup onfocusin={() => api().pause()} onpointerenter={() => api().pause()}>
        {#each slides as slide, index (slide.id)}
          <CarouselItem {index}>
            <img class={styles.image} src={slide.src} alt={slide.alt} />
          </CarouselItem>
        {/each}
      </CarouselItemGroup>

      <CarouselControl onfocusin={() => api().pause()} onpointerenter={() => api().pause()}>
        <CarouselAutoplayTrigger>
          <CarouselAutoplayIndicator>
            Pause
            {#snippet fallback()}Play{/snippet}
          </CarouselAutoplayIndicator>
        </CarouselAutoplayTrigger>
        <CarouselPrevTrigger />
        <CarouselIndicators />
        <CarouselNextTrigger />
      </CarouselControl>
    {/snippet}
  </CarouselContext>
</Carousel>