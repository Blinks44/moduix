<script lang="ts">
  import { ColorPickerControl, type ColorPickerControlProps } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerControlProps = $props();
</script>

<ColorPickerControl
  {...props}
  bind:ref
  class={cn('flex min-w-0 items-center gap-2', className)}
  data-slot="color-picker-control"
/>