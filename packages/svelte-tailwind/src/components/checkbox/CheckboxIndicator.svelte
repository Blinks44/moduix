<script lang="ts">
  import { CheckboxIndicator, type CheckboxIndicatorProps } from '@ark-ui/svelte/checkbox';
  import { cn } from '@/lib/moduix/cn';
  import { CheckIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui';

  let {
    children,
    class: className,
    indeterminate,
    ref = $bindable(null),
    ...props
  }: CheckboxIndicatorProps = $props();
</script>

<CheckboxIndicator
  {...props}
  bind:ref
  {indeterminate}
  class={cn(
    'inline-flex size-3 group-data-[size=lg]/checkbox:size-3.5 group-data-[size=sm]/checkbox:size-2.5 group-data-[size=xl]/checkbox:size-4 group-data-[size=xs]/checkbox:size-2 [&>svg]:size-full',
    className,
  )}
  data-slot="checkbox-indicator"
>
  {#if children}
    {@render children()}
  {:else if indeterminate}
    <IndeterminateIcon />
  {:else}
    <CheckIcon />
  {/if}
</CheckboxIndicator>