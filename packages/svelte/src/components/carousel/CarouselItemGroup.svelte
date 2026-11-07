<script lang="ts">
  import { CarouselItemGroup, type CarouselItemGroupProps } from '@ark-ui/svelte/carousel';
  import { clsx } from 'clsx';
  import styles from './Carousel.module.css';

  let { class: className, ref = $bindable(null), ...props }: CarouselItemGroupProps = $props();
</script>

<CarouselItemGroup
  {...props}
  bind:ref
  class={clsx(styles.itemGroup, className)}
  data-slot="carousel-item-group"
/>