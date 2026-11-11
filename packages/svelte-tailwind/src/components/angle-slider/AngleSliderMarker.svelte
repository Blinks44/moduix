<script lang="ts">
  import { AngleSliderMarker, type AngleSliderMarkerProps } from '@ark-ui/svelte/angle-slider';
  import { cn } from '@/lib/moduix/cn';

  const markerClass =
    "absolute inset-0 before:absolute before:top-1 before:left-1/2 before:h-2 before:w-0.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-muted-foreground before:content-[''] data-[state=at-value]:before:bg-foreground data-[state=under-value]:before:bg-(--_angle-slider-fill)";

  let { class: className, ref = $bindable(null), ...props }: AngleSliderMarkerProps = $props();
</script>

<AngleSliderMarker
  {...props}
  bind:ref
  class={cn(markerClass, className)}
  data-slot="angle-slider-marker"
/>