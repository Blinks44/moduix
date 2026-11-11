<script lang="ts">
  import { ComboboxItemIndicator, type ComboboxItemIndicatorProps } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';
  import { CheckIcon } from '@/lib/moduix/icons/ui';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ComboboxItemIndicatorProps = $props();
</script>

<ComboboxItemIndicator
  {...props}
  bind:ref
  class={cn('inline-flex size-3 shrink-0 items-center justify-center [&>svg]:size-full', className)}
  data-slot="combobox-item-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <CheckIcon />
  {/if}
</ComboboxItemIndicator>