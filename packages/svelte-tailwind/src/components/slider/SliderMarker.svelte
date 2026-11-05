<script lang="ts">
  import { SliderMarker, type SliderMarkerProps } from '@ark-ui/svelte/slider';
  import { cn } from '@/lib/moduix/cn';

  const markerClass =
    "text-xs leading-4 text-muted-foreground before:absolute before:start-1/2 before:-top-2 before:-ms-0.5 before:size-1 before:rounded-full before:bg-border before:content-[''] data-[orientation=vertical]:before:-start-2 data-[orientation=vertical]:before:top-1/2 data-[orientation=vertical]:before:-mt-0.5 data-[state=at-value]:before:bg-primary group-data-invalid:data-[state=at-value]:before:bg-destructive data-[state=under-value]:before:bg-primary group-data-invalid:data-[state=under-value]:before:bg-destructive";

  let { class: className, ref = $bindable(null), ...props }: SliderMarkerProps = $props();
</script>

<SliderMarker {...props} bind:ref class={cn(markerClass, className)} data-slot="slider-marker" />