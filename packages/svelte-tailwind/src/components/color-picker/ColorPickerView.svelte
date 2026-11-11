<script lang="ts">
  import { ColorPickerView, type ColorPickerViewProps } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerViewProps = $props();
  const viewClass = 'flex min-w-0 flex-col gap-2 [&[hidden]:not([hidden="until-found"])]:hidden';
</script>

<ColorPickerView
  {...props}
  bind:ref
  class={cn(viewClass, className)}
  data-slot="color-picker-view"
/>