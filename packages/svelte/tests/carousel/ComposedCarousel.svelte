<script lang="ts">
  import {
    Carousel,
    CarouselControl,
    CarouselIndicators,
    CarouselItem,
    CarouselItemGroup,
    CarouselNextTrigger,
    CarouselPrevTrigger,
  } from '@/components/carousel';

  let rootRef = $state<HTMLElement | null>(null);
  let indicatorsRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ indicatorsRef, rootRef });
</script>

<Carousel bind:ref={rootRef} aria-label="Composed gallery" slideCount={2}>
  {#snippet asChild(props)}
    <section {...props()} data-testid="composed-carousel">
      <CarouselItemGroup>
        <CarouselItem index={0}>First</CarouselItem>
        <CarouselItem index={1}>Second</CarouselItem>
      </CarouselItemGroup>
      <CarouselControl>
        <CarouselPrevTrigger>
          {#snippet asChild(triggerProps)}
            <button {...triggerProps()} type="button">Back</button>
          {/snippet}
        </CarouselPrevTrigger>
        <CarouselNextTrigger />
        <CarouselIndicators bind:ref={indicatorsRef} indicatorClassName="generated-indicator" />
      </CarouselControl>
    </section>
  {/snippet}
</Carousel>