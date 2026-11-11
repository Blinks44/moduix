<script lang="ts">
  import { SelectClearTrigger, type SelectClearTriggerProps } from '@ark-ui/svelte/select';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import CloseButton from '../close-button/CloseButton.svelte';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  }: SelectClearTriggerProps = $props();

  const clearClass = 'absolute inset-y-0 end-[2.125rem] my-auto size-control-xs';
</script>

{#if asChild}
  <SelectClearTrigger
    {...props}
    bind:ref
    {asChild}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    class={cn(clearClass, className)}
    data-slot="select-clear-trigger"
  />
{:else}
  <SelectClearTrigger
    {...props}
    bind:ref
    class={cn(clearClass, className)}
    data-slot="select-clear-trigger"
  >
    {#snippet asChild(triggerProps)}
      <CloseButton
        {...triggerProps()}
        aria-label={ariaLabel ?? (ariaLabelledBy == null ? a11yLabels.clearSelection : undefined)}
        aria-labelledby={ariaLabelledBy}
        {children}
      />
    {/snippet}
  </SelectClearTrigger>
{/if}