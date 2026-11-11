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
  class={cn(
    'ms-auto inline-flex shrink-0 text-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0',
    className,
  )}
  data-slot="command-palette-item-indicator"
>
  {#if children}{@render children()}{:else}<CheckIcon />{/if}
</ComboboxItemIndicator>