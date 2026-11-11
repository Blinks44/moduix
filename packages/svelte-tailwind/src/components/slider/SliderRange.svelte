<script lang="ts">
  import { SliderRange, type SliderRangeProps } from '@ark-ui/svelte/slider';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SliderRangeProps = $props();
</script>

<SliderRange
  {...props}
  bind:ref
  class={cn(
    'h-full rounded-[inherit] bg-primary data-invalid:bg-destructive data-[orientation=vertical]:w-full',
    className,
  )}
  data-slot="slider-range"
/>