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
    'pointer-events-none absolute end-(--_select-action-offset) top-1/2 inline-flex size-(--_select-action-size) -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-[background-color,color] duration-normal ease-in-out peer-enabled/select-trigger:peer-hover/select-trigger:bg-muted peer-enabled/select-trigger:peer-hover/select-trigger:text-foreground [&>svg]:size-4',
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