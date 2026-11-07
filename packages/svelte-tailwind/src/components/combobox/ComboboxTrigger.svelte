<script lang="ts">
  import { ComboboxTrigger, type ComboboxTriggerProps } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronUpDownIcon } from '@/lib/moduix/icons/ui';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ComboboxTriggerProps = $props();
</script>

<ComboboxTrigger
  {...props}
  bind:ref
  class={cn(
    'absolute end-2 top-1/2 m-0 inline-flex size-control-xs -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color] duration-normal ease-in-out focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring data-disabled:cursor-default [&>svg]:size-4 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-foreground',
    className,
  )}
  data-slot="combobox-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronUpDownIcon />
  {/if}
</ComboboxTrigger>