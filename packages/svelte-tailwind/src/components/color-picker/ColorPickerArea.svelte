<script lang="ts">
  import { ColorPickerArea, type ColorPickerAreaProps } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  import ColorPickerAreaBackground from './ColorPickerAreaBackground.svelte';
  import ColorPickerAreaThumb from './ColorPickerAreaThumb.svelte';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerAreaProps = $props();
</script>

<ColorPickerArea
  {...props}
  bind:ref
  class={cn(
    'h-40 w-full overflow-hidden rounded-md shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)] select-none',
    className,
  )}
  data-slot="color-picker-area"
>
  {#if children}
    {@render children()}
  {:else}
    <ColorPickerAreaBackground />
    <ColorPickerAreaThumb />
  {/if}
</ColorPickerArea>