<script lang="ts">
  import { SliderLabel, type SliderLabelProps } from '@ark-ui/svelte/slider';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SliderLabelProps = $props();
</script>

<SliderLabel
  {...props}
  bind:ref
  class={cn('text-sm leading-5 group-data-[orientation=vertical]:[grid-area:label]', className)}
  data-slot="slider-label"
/>