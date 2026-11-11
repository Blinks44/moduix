<script lang="ts">
  import {
    ColorPickerFormatSelect,
    type ColorPickerFormatSelectProps,
  } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerFormatSelectProps = $props();
</script>

<span class="relative inline-grid w-fit max-w-full min-w-0 shrink-0">
  <ColorPickerFormatSelect
    {...props}
    bind:ref
    class={cn(
      'peer/format-select h-control-md w-auto min-w-0 cursor-pointer appearance-none rounded-md border border-input bg-background px-3 pe-8 text-sm text-foreground uppercase outline-focus-halo outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out focus:border-ring focus:outline-ring/50 disabled:cursor-default data-invalid:border-destructive data-invalid:focus:outline-destructive/20 forced-colors:appearance-auto forced-colors:pe-3',
      className,
    )}
    data-slot="color-picker-format-select"
  />
  <span
    aria-hidden="true"
    class="pointer-events-none absolute end-3 top-1/2 inline-flex size-4 -translate-y-1/2 rounded-sm text-muted-foreground transition-[background-color,color] duration-normal ease-in-out forced-colors:hidden [&>svg]:size-full [@media(hover:hover)]:peer-[:not(:disabled):hover]/format-select:bg-muted [@media(hover:hover)]:peer-[:not(:disabled):hover]/format-select:text-foreground"
  >
    <ChevronDownIcon />
  </span>
</span>