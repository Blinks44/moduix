<script lang="ts">
  import { SelectItemIndicator, type SelectItemIndicatorProps } from '@ark-ui/svelte/select';
  import { cn } from '@/lib/moduix/cn';
  import { CheckIcon } from '@/lib/moduix/icons/ui';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: SelectItemIndicatorProps = $props();
</script>

<SelectItemIndicator
  {...props}
  bind:ref
  class={cn('inline-flex size-3.5 shrink-0 items-center justify-center [&>svg]:size-3', className)}
  data-slot="select-item-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <CheckIcon />
  {/if}
</SelectItemIndicator>