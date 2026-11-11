<script lang="ts">
  import { CollapsibleIndicator, type CollapsibleIndicatorProps } from '@ark-ui/svelte/collapsible';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: CollapsibleIndicatorProps = $props();
</script>

<CollapsibleIndicator
  {...props}
  bind:ref
  class={cn(
    'inline-flex size-3 shrink-0 items-center justify-center transition-transform duration-normal data-[state=open]:rotate-180 [&_svg]:size-full',
    className,
  )}
  data-slot="collapsible-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronDownIcon />
  {/if}
</CollapsibleIndicator>