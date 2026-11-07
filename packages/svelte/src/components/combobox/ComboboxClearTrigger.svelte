<script lang="ts">
  import { ComboboxClearTrigger, type ComboboxClearTriggerProps } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import CloseButton from '../close-button/CloseButton.svelte';
  import styles from './Combobox.module.css';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  }: ComboboxClearTriggerProps = $props();
</script>

{#if asChild}
  <ComboboxClearTrigger
    {...props}
    bind:ref
    {asChild}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    class={clsx(styles.clearTrigger, className)}
    data-slot="combobox-clear-trigger"
  />
{:else}
  <ComboboxClearTrigger
    {...props}
    bind:ref
    class={clsx(styles.clearTrigger, className)}
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