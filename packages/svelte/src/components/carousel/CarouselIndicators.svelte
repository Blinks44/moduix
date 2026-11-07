<script module lang="ts">
  import type { CarouselIndicatorGroupProps } from '@ark-ui/svelte/carousel';

  export interface CarouselIndicatorsProps extends Omit<
    CarouselIndicatorGroupProps,
    'asChild' | 'children'
  > {
    indicatorClassName?: string;
  }
</script>

<script lang="ts">
  import { useCarouselContext } from '@ark-ui/svelte/carousel';
  import CarouselIndicator from './CarouselIndicator.svelte';
  import CarouselIndicatorGroup from './CarouselIndicatorGroup.svelte';

  let { indicatorClassName, ref = $bindable(null), ...props }: CarouselIndicatorsProps = $props();

  const carousel = useCarouselContext();
</script>

<CarouselIndicatorGroup {...props} bind:ref>
  {#each carousel().pageSnapPoints as _, index (index)}
    <CarouselIndicator {index} class={indicatorClassName} />
  {/each}
</CarouselIndicatorGroup>