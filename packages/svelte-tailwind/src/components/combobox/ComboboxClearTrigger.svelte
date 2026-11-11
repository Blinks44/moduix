<script lang="ts">
  import { ComboboxClearTrigger, type ComboboxClearTriggerProps } from '@ark-ui/svelte/combobox';
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
  }: ComboboxClearTriggerProps = $props();

  const triggerClass =
    'absolute inset-y-0 end-2 my-auto size-control-xs group-has-[>[data-slot=combobox-trigger]]/combobox-control:end-[2.125rem]';
</script>

{#if asChild}
  <ComboboxClearTrigger
    {...props}
    bind:ref
    {asChild}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    class={cn(triggerClass, className)}
    data-slot="combobox-clear-trigger"
  />
{:else}
  <ComboboxClearTrigger
    {...props}
    bind:ref
    class={cn(triggerClass, className)}
    data-slot="combobox-clear-trigger"
  >
    {#snippet asChild(triggerProps)}
      <CloseButton
        {...triggerProps()}
        aria-label={ariaLabel ?? (ariaLabelledBy == null ? a11yLabels.clearSelection : undefined)}
        aria-labelledby={ariaLabelledBy}
        {children}
      />
    {/snippet}
  </ComboboxClearTrigger>
{/if}