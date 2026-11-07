<script lang="ts">
  import {
    ColorPickerChannelInput,
    type ColorPickerChannelInputProps,
  } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerChannelInputProps = $props();
</script>

<ColorPickerChannelInput
  {...props}
  bind:ref
  class={cn(
    'h-control-md w-full min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-focus-halo outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out focus:border-ring focus:outline-ring/50 disabled:cursor-default data-invalid:border-destructive data-invalid:focus:outline-destructive/20 data-readonly:cursor-default data-[channel=alpha]:w-16 data-[channel=alpha]:flex-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none',
    className,
  )}
  data-slot="color-picker-channel-input"
/>