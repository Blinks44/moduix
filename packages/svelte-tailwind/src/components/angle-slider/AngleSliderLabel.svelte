<script lang="ts">
  import { AngleSliderLabel, type AngleSliderLabelProps } from '@ark-ui/svelte/angle-slider';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: AngleSliderLabelProps = $props();
</script>

<AngleSliderLabel
  {...props}
  bind:ref
  class={cn('text-center text-sm font-medium', className)}
  data-slot="angle-slider-label"
/>