<script lang="ts">
  import { ColorPickerContent, type ColorPickerContentProps } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerContentProps = $props();
</script>

<ColorPickerContent
  {...props}
  bind:ref
  class={cn(
    'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] flex max-h-[min(32rem,var(--available-height))] w-64 max-w-(--available-width) origin-(--transform-origin) flex-col gap-3 overflow-auto overscroll-contain rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none',
    className,
  )}
  data-slot="color-picker-content"
/>