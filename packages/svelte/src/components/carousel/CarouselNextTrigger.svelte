<script lang="ts">
  import { CarouselNextTrigger, type CarouselNextTriggerProps } from '@ark-ui/svelte/carousel';
  import { clsx } from 'clsx';
  import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
  import styles from './Carousel.module.css';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: CarouselNextTriggerProps = $props();
</script>

<CarouselNextTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(styles.trigger, className)}
  data-slot="carousel-next-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <ChevronRightIcon class={styles.icon} />
  {/if}
</CarouselNextTrigger>