<script lang="ts">
  import { SliderTrack, type SliderTrackProps } from '@ark-ui/svelte/slider';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SliderTrackProps = $props();
</script>

<SliderTrack
  {...props}
  bind:ref
  class={cn(
    'h-1.5 flex-1 overflow-hidden rounded-full bg-muted ring-1 ring-border ring-inset data-invalid:ring-destructive data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
    className,
  )}
  data-slot="slider-track"
/>