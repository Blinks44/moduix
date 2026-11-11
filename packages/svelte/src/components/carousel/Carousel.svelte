<script lang="ts">
  import { CarouselRoot, type CarouselRootProps } from '@ark-ui/svelte/carousel';
  import { clsx } from 'clsx';
  import styles from './Carousel.module.css';

  let {
    class: className,
    page = $bindable(),
    ref = $bindable(null),
    ...props
  }: CarouselRootProps = $props();
</script>

<CarouselRoot
  {...props}
  bind:page
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="carousel-root"
/>