<script lang="ts">
  import {
    NumberInputIncrementTrigger,
    type NumberInputIncrementTriggerProps,
  } from '@ark-ui/svelte/number-input';
  import { cn } from '@/lib/moduix/cn';
  import { PlusIcon } from '@/lib/moduix/icons/ui';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: NumberInputIncrementTriggerProps = $props();
</script>

<NumberInputIncrementTrigger
  {...props}
  bind:ref
  class={cn(
    'inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center border border-input bg-background p-0 text-foreground transition-[background-color,border-color,color] duration-normal ease-in-out outline-none select-none group-focus-within/number-input-control:border-ring group-data-invalid/number-input:border-destructive group-data-[size=lg]/number-input:size-control-lg group-data-[size=sm]/number-input:size-control-sm group-data-[size=xl]/number-input:size-control-xl group-data-[size=xs]/number-input:size-control-xs active:bg-accent data-disabled:pointer-events-none data-disabled:text-muted-foreground [&>svg]:size-3.5 group-data-[size=lg]/number-input:[&>svg]:size-4 group-data-[size=sm]/number-input:[&>svg]:size-3 group-data-[size=xl]/number-input:[&>svg]:size-4 group-data-[size=xs]/number-input:[&>svg]:size-3 [@media(hover:hover)]:hover:bg-accent',
    'rounded-e-md border-s-0',
    className,
  )}
  data-slot="number-input-increment-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <PlusIcon />
  {/if}
</NumberInputIncrementTrigger>