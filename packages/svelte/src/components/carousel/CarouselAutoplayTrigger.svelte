<script lang="ts">
  import {
    CarouselAutoplayTrigger,
    type CarouselAutoplayTriggerProps,
  } from '@ark-ui/svelte/carousel';
  import { clsx } from 'clsx';
  import styles from './Carousel.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: CarouselAutoplayTriggerProps = $props();
</script>

<CarouselAutoplayTrigger
  {...props}
  bind:ref
  class={clsx(styles.trigger, styles.autoplayTrigger, className)}
  data-slot="carousel-autoplay-trigger"
/>