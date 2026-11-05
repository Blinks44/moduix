<script lang="ts">
  import { SelectClearTrigger, type SelectClearTriggerProps } from '@ark-ui/svelte/select';
  import { clsx } from 'clsx';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import CloseButton from '../close-button/CloseButton.svelte';
  import styles from './Select.module.css';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  }: SelectClearTriggerProps = $props();
</script>

{#if asChild}
  <SelectClearTrigger
    {...props}
    bind:ref
    {asChild}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    class={clsx(styles.clearTrigger, className)}
    data-slot="select-clear-trigger"
  />
{:else}
  <SelectClearTrigger
    {...props}
    bind:ref
    class={clsx(styles.clearTrigger, className)}
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