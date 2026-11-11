<script lang="ts">
  import { SliderMarkerGroup, type SliderMarkerGroupProps } from '@ark-ui/svelte/slider';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SliderMarkerGroupProps = $props();
</script>

<SliderMarkerGroup
  {...props}
  bind:ref
  class={cn(
    'col-span-full mt-2 min-h-4 group-data-[orientation=vertical]:m-0 group-data-[orientation=vertical]:h-full group-data-[orientation=vertical]:[grid-area:markers]',
    className,
  )}
  data-slot="slider-marker-group"
/>