<script lang="ts">
  import { CarouselProgressText, type CarouselProgressTextProps } from '@ark-ui/svelte/carousel';
  import { clsx } from 'clsx';
  import styles from './Carousel.module.css';

  let { class: className, ref = $bindable(null), ...props }: CarouselProgressTextProps = $props();
</script>

<CarouselProgressText
  {...props}
  bind:ref
  class={clsx(styles.progressText, className)}
  data-slot="carousel-progress-text"
/>