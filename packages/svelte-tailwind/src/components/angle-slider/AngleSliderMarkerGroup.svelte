<script lang="ts">
  import {
    AngleSliderMarkerGroup,
    type AngleSliderMarkerGroupProps,
  } from '@ark-ui/svelte/angle-slider';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: AngleSliderMarkerGroupProps = $props();
</script>

<AngleSliderMarkerGroup
  {...props}
  bind:ref
  class={cn('pointer-events-none absolute inset-0 z-1', className)}
  data-slot="angle-slider-marker-group"
/>