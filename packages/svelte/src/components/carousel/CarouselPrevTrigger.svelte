<script lang="ts">
  import { CarouselPrevTrigger, type CarouselPrevTriggerProps } from '@ark-ui/svelte/carousel';
  import { clsx } from 'clsx';
  import { ChevronLeftIcon } from '@/lib/moduix/icons/ui';
  import styles from './Carousel.module.css';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: CarouselPrevTriggerProps = $props();
</script>

<CarouselPrevTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(styles.trigger, className)}
  data-slot="carousel-prev-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <ChevronLeftIcon class={styles.icon} />
  {/if}
</CarouselPrevTrigger>