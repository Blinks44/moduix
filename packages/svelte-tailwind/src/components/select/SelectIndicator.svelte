<script lang="ts">
  import { SelectIndicator, type SelectIndicatorProps } from '@ark-ui/svelte/select';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronUpDownIcon } from '@/lib/moduix/icons/ui';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: SelectIndicatorProps = $props();
</script>

<SelectIndicator
  {...props}
  bind:ref
  class={cn(
    'pointer-events-none absolute end-2 top-1/2 inline-flex size-control-xs -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-[background-color,color] duration-normal ease-in-out [&>svg]:size-4 [@media(hover:hover)]:peer-[:enabled:hover]/select-trigger:bg-muted [@media(hover:hover)]:peer-[:enabled:hover]/select-trigger:text-foreground',
    className,
  )}
  data-slot="select-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronUpDownIcon />
  {/if}
</SelectIndicator>