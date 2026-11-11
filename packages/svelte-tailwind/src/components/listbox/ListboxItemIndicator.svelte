<script lang="ts">
  import { ListboxItemIndicator, type ListboxItemIndicatorProps } from '@ark-ui/svelte/listbox';
  import { cn } from '@/lib/moduix/cn';
  import { CheckIcon } from '@/lib/moduix/icons/ui';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ListboxItemIndicatorProps = $props();
</script>

<ListboxItemIndicator
  {...props}
  bind:ref
  class={cn(
    'inline-flex size-4 shrink-0 items-center justify-center data-[state=unchecked]:invisible [&>svg]:size-3',
    className,
  )}
  data-slot="listbox-item-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <CheckIcon />
  {/if}
</ListboxItemIndicator>