<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import {
    Carousel,
    CarouselAutoplayIndicator,
    CarouselAutoplayTrigger,
    CarouselContext,
    CarouselControl,
    CarouselIndicator,
    CarouselIndicatorGroup,
    CarouselIndicators,
    CarouselItem,
    CarouselItemGroup,
    CarouselNextTrigger,
    CarouselPrevTrigger,
    CarouselProgressText,
  } from '@/components/carousel';
  import { PlusIcon } from '@/lib/moduix/icons/ui';
  import ImageSlide from './ImageSlide.svelte';
  import RootProviderDemo from './RootProviderDemo.svelte';
  import { slides, variableSlides } from './slides';

  const frameClass = 'w-[min(52rem,calc(100vw-4rem))]';
  const carouselClass = 'w-full max-w-128';
  const wideCarouselClass = 'w-full max-w-192';
  const shortImageClass = 'h-60';
  const statusClass = 'm-0 text-sm text-muted-foreground tabular-nums';
  const controlsClass = 'justify-center';

  const { Story } = defineMeta({
    title: 'Components/Carousel',
    component: Carousel,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let controlledPage = $state(0);
  let dynamicPage = $state(0);
  let dynamicCount = $state(4);
  const visibleSlides = $derived(slides.slice(0, dynamicCount));
</script>

<Story name="Basic" asChild>
  <div class={frameClass}>
    <Carousel
      aria-label="Basic image carousel"
      class={carouselClass}
      spacing="1em"
      slideCount={slides.length}
    >
      <CarouselItemGroup aria-label="Basic image carousel">
        {#each slides as slide, index (slide.id)}
          <CarouselItem {index}>
            <ImageSlide src={slide.image} alt={slide.alt} />
          </CarouselItem>
        {/each}
      </CarouselItemGroup>
      <CarouselControl class={controlsClass}>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
      </CarouselControl>
      <CarouselIndicators />
      <CarouselProgressText />
    </Carousel>
  </div>
</Story>

<Story name="Controlled" asChild>
  <div class={frameClass}>
    <Carousel
      aria-label="Controlled image carousel"
      class={carouselClass}
      spacing="1em"
      page={controlledPage}
      slideCount={slides.length}
      onPageChange={(details) => (controlledPage = details.page)}
    >
      <CarouselItemGroup aria-label="Controlled image carousel">
        {#each slides as slide, index (slide.id)}
          <CarouselItem {index}>
            <ImageSlide src={slide.image} alt={slide.alt} />
          </CarouselItem>
        {/each}
      </CarouselItemGroup>
      <CarouselControl class={controlsClass}>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
      </CarouselControl>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <CarouselIndicators />
        <output class={statusClass}>Page {controlledPage + 1}</output>
      </div>
    </Carousel>
  </div>
</Story>

<Story name="Dynamic Slides" exportName="DynamicSlides" asChild>
  <div class={frameClass}>
    <div class="grid justify-items-start gap-3">
      <Carousel
        aria-label="Dynamic image carousel"
        class={carouselClass}
        page={dynamicPage}
        slideCount={visibleSlides.length}
        spacing="1em"
        onPageChange={(details) => (dynamicPage = details.page)}
      >
        <CarouselItemGroup aria-label="Dynamic image carousel">
          {#each visibleSlides as slide, index (slide.id)}
            <CarouselItem {index}>
              <ImageSlide src={slide.image} alt={slide.alt} />
            </CarouselItem>
          {/each}
        </CarouselItemGroup>
        <CarouselControl>
          <CarouselPrevTrigger />
          <CarouselIndicators />
          <CarouselNextTrigger />
        </CarouselControl>
      </Carousel>
      <Button
        variant="outline"
        disabled={dynamicCount === slides.length}
        onclick={() => (dynamicCount = Math.min(slides.length, dynamicCount + 1))}
      >
        <PlusIcon />
        Add slide
      </Button>
    </div>
  </div>
</Story>

<Story name="Pause On Hover" exportName="PauseOnHover" asChild>
  <div class={frameClass}>
    <Carousel
      aria-label="Pause on hover image carousel"
      autoplay
      loop
      class={carouselClass}
      slideCount={slides.length}
      spacing="1em"
    >
      <CarouselContext>
        {#snippet render(api)}
          <p class={statusClass}>Autoplay: {api().isPlaying ? 'playing' : 'paused'}</p>
          <CarouselItemGroup
            onfocusin={() => api().pause()}
            onpointerenter={() => api().pause()}
            onpointerleave={() => api().play()}
          >
            {#each slides as slide, index (slide.id)}
              <CarouselItem {index}>
                <ImageSlide src={slide.image} alt={slide.alt} />
              </CarouselItem>
            {/each}
          </CarouselItemGroup>
          <CarouselControl
            class={controlsClass}
            onfocusin={() => api().pause()}
            onpointerenter={() => api().pause()}
            onpointerleave={() => api().play()}
          >
            <CarouselAutoplayTrigger>
              <CarouselAutoplayIndicator>
                Pause
                {#snippet fallback()}Play{/snippet}
              </CarouselAutoplayIndicator>
            </CarouselAutoplayTrigger>
            <CarouselIndicators />
          </CarouselControl>
        {/snippet}
      </CarouselContext>
    </Carousel>
  </div>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <RootProviderDemo />
</Story>

<Story name="Scroll To" exportName="ScrollTo" asChild>
  <div class={frameClass}>
    <Carousel
      aria-label="Scroll to image carousel"
      class={carouselClass}
      slideCount={slides.length}
      spacing="1em"
    >
      <CarouselContext>
        {#snippet render(api)}
          <div class="flex items-center justify-between gap-3">
            <Button variant="outline" onclick={() => api().scrollToIndex(3)}>Go to slide 4</Button>
          </div>
        {/snippet}
      </CarouselContext>
      <CarouselItemGroup aria-label="Scroll to image carousel">
        {#each slides as slide, index (slide.id)}
          <CarouselItem {index}>
            <ImageSlide src={slide.image} alt={slide.alt} />
          </CarouselItem>
        {/each}
      </CarouselItemGroup>
      <CarouselControl class={controlsClass}>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
      </CarouselControl>
      <CarouselIndicators />
    </Carousel>
  </div>
</Story>

<Story name="Slides Per Page" exportName="SlidesPerPage" asChild>
  <div class={frameClass}>
    <Carousel
      aria-label="Two-up image carousel"
      class={wideCarouselClass}
      slideCount={slides.length}
      slidesPerPage={2}
      spacing="1em"
    >
      <CarouselControl class={controlsClass}>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
      </CarouselControl>
      <CarouselItemGroup aria-label="Two-up image carousel">
        {#each slides as slide, index (slide.id)}
          <CarouselItem {index}>
            <ImageSlide class={shortImageClass} src={slide.image} alt={slide.alt} />
          </CarouselItem>
        {/each}
      </CarouselItemGroup>
      <CarouselIndicators />
    </Carousel>
  </div>
</Story>

<Story name="Spacing" asChild>
  <div class={frameClass}>
    <Carousel
      aria-label="Spaced image carousel"
      class={wideCarouselClass}
      slideCount={slides.length}
      slidesPerPage={1.5}
      spacing="1em"
    >
      <p class={statusClass}>spacing="1em"</p>
      <CarouselItemGroup aria-label="Spaced image carousel">
        {#each slides as slide, index (slide.id)}
          <CarouselItem {index}>
            <ImageSlide class={shortImageClass} src={slide.image} alt={slide.alt} />
          </CarouselItem>
        {/each}
      </CarouselItemGroup>
      <CarouselControl>
        <CarouselPrevTrigger />
        <CarouselIndicators />
        <CarouselNextTrigger />
      </CarouselControl>
    </Carousel>
  </div>
</Story>

<Story name="Thumbnail Indicator" exportName="ThumbnailIndicator" asChild>
  <div class={frameClass}>
    <Carousel
      aria-label="Image carousel with thumbnail indicators"
      class={carouselClass}
      slideCount={slides.length}
      spacing="1em"
    >
      <CarouselItemGroup aria-label="Image carousel with thumbnail indicators">
        {#each slides as slide, index (slide.id)}
          <CarouselItem {index}>
            <ImageSlide src={slide.image} alt={slide.alt} />
          </CarouselItem>
        {/each}
      </CarouselItemGroup>
      <CarouselControl class={controlsClass}>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
      </CarouselControl>
      <CarouselIndicatorGroup class="flex-wrap">
        {#each slides as slide, index (slide.id)}
          <CarouselIndicator
            class="h-12 w-20 overflow-hidden rounded-lg border border-transparent bg-transparent p-0 opacity-65 transition-[border-color,opacity,transform] hover:opacity-90 data-current:h-12 data-current:w-20 data-current:-translate-y-px data-current:border-primary data-current:bg-transparent data-current:opacity-100"
            {index}
          >
            <img class="block size-full object-cover" src={slide.image} alt={slide.alt} />
          </CarouselIndicator>
        {/each}
      </CarouselIndicatorGroup>
    </Carousel>
  </div>
</Story>

<Story name="Variable Size" exportName="VariableSize" asChild>
  <div class={frameClass}>
    <Carousel
      aria-label="Variable image carousel"
      autoSize
      class={carouselClass}
      padding="1rem"
      slideCount={variableSlides.length}
      spacing="1em"
    >
      <CarouselControl class={controlsClass}>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
      </CarouselControl>
      <CarouselItemGroup aria-label="Variable image carousel">
        {#each variableSlides as slide, index (slide.id)}
          <CarouselItem {index} snapAlign="center">
            <ImageSlide
              class={shortImageClass}
              src={slide.image}
              alt={slide.alt}
              style={`width: ${slide.width}`}
            />
          </CarouselItem>
        {/each}
      </CarouselItemGroup>
      <CarouselIndicators />
    </Carousel>
  </div>
</Story>

<Story name="Autoplay" asChild>
  <div class={frameClass}>
    <Carousel
      aria-label="Autoplay image carousel"
      autoplay={{ delay: 3500 }}
      loop
      class={carouselClass}
      slideCount={slides.length}
      spacing="1em"
    >
      <CarouselContext>
        {#snippet render(api)}
          <CarouselItemGroup
            aria-label="Autoplay image carousel"
            onfocusin={() => api().pause()}
            onpointerenter={() => api().pause()}
          >
            {#each slides as slide, index (slide.id)}
              <CarouselItem {index}>
                <ImageSlide src={slide.image} alt={slide.alt} />
              </CarouselItem>
            {/each}
          </CarouselItemGroup>
          <CarouselControl
            class={controlsClass}
            onfocusin={() => api().pause()}
            onpointerenter={() => api().pause()}
          >
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
  </div>
</Story>

<Story name="Loop" asChild>
  <div class={frameClass}>
    <Carousel
      aria-label="Looping image carousel"
      loop
      class={carouselClass}
      slideCount={slides.length}
      spacing="1em"
    >
      <CarouselItemGroup aria-label="Looping image carousel">
        {#each slides as slide, index (slide.id)}
          <CarouselItem {index}>
            <ImageSlide src={slide.image} alt={slide.alt} />
          </CarouselItem>
        {/each}
      </CarouselItemGroup>
      <CarouselControl class={controlsClass}>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
      </CarouselControl>
      <CarouselIndicators />
      <CarouselProgressText />
    </Carousel>
  </div>
</Story>

<Story name="Mouse Drag" exportName="MouseDrag" asChild>
  <div class={frameClass}>
    <Carousel
      allowMouseDrag
      aria-label="Mouse draggable image carousel"
      class={carouselClass}
      slideCount={slides.length}
      spacing="1em"
    >
      <CarouselItemGroup aria-label="Mouse draggable image carousel">
        {#each slides as slide, index (slide.id)}
          <CarouselItem {index}>
            <ImageSlide src={slide.image} alt={slide.alt} />
          </CarouselItem>
        {/each}
      </CarouselItemGroup>
      <CarouselControl class={controlsClass}>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
      </CarouselControl>
      <CarouselIndicators />
      <CarouselProgressText />
    </Carousel>
  </div>
</Story>

<Story name="Rtl" asChild>
  <div class={frameClass}>
    <Carousel
      aria-label="Right-to-left image carousel"
      dir="rtl"
      class={carouselClass}
      slideCount={slides.length}
      spacing="1em"
    >
      <CarouselItemGroup aria-label="Right-to-left image carousel">
        {#each slides as slide, index (slide.id)}
          <CarouselItem {index}>
            <ImageSlide src={slide.image} alt={slide.alt} />
          </CarouselItem>
        {/each}
      </CarouselItemGroup>
      <CarouselControl class={controlsClass}>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
      </CarouselControl>
      <CarouselIndicators />
      <CarouselProgressText />
    </Carousel>
  </div>
</Story>

<Story name="Vertical" asChild>
  <div class={frameClass}>
    <Carousel
      aria-label="Vertical image carousel"
      class="w-full max-w-152 data-[orientation=vertical]:h-112"
      orientation="vertical"
      slideCount={slides.length}
      spacing="1em"
    >
      <CarouselItemGroup aria-label="Vertical image carousel">
        {#each slides as slide, index (slide.id)}
          <CarouselItem {index}>
            <ImageSlide class="h-full" src={slide.image} alt={slide.alt} />
          </CarouselItem>
        {/each}
      </CarouselItemGroup>
      <CarouselControl>
        <CarouselPrevTrigger />
        <CarouselIndicators />
        <CarouselNextTrigger />
      </CarouselControl>
    </Carousel>
  </div>
</Story>