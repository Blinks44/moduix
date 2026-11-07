<script lang="ts">
  import {
    ColorPickerAreaThumb,
    type ColorPickerAreaThumbProps,
  } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerAreaThumbProps = $props();
</script>

<ColorPickerAreaThumb
  {...props}
  bind:ref
  class={cn(
    'size-4 rounded-full shadow-[0_0_0_4px_color-mix(in_oklab,black_18%,transparent),var(--moduix-shadow-sm)] ring-2 ring-background outline-0 focus-visible:shadow-[0_0_0_4px_var(--color-ring),var(--moduix-shadow-sm)]',
    className,
  )}
  data-slot="color-picker-area-thumb"
/>