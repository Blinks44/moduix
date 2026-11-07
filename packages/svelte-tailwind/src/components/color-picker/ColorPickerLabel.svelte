<script lang="ts">
  import { ColorPickerLabel, type ColorPickerLabelProps } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerLabelProps = $props();
</script>

<ColorPickerLabel
  {...props}
  bind:ref
  class={cn('inline-flex items-center text-sm font-medium select-none', className)}
  data-slot="color-picker-label"
/>