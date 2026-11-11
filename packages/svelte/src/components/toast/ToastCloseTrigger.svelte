<script module lang="ts">
  import type { ToastCloseTriggerProps as ArkToastCloseTriggerProps } from '@ark-ui/svelte/toast';

  export interface ToastCloseTriggerProps extends ArkToastCloseTriggerProps {}
</script>

<script lang="ts">
  import { ToastCloseTrigger } from '@ark-ui/svelte/toast';
  import { clsx } from 'clsx';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import CloseButton from '../close-button/CloseButton.svelte';
  import styles from './Toast.module.css';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...props
  }: ToastCloseTriggerProps = $props();

  const resolvedAriaLabel = $derived(
    ariaLabel === undefined && ariaLabelledby == null ? a11yLabels.closeToast : ariaLabel,
  );
</script>

{#if asChild}
  <ToastCloseTrigger
    {...props}
    bind:ref
    {asChild}
    aria-label={resolvedAriaLabel}
    aria-labelledby={ariaLabelledby}
    class={className}
    data-slot="toast-close-trigger"
  />
{:else}
  <ToastCloseTrigger {...props} bind:ref>
    {#snippet asChild(triggerProps)}
      <CloseButton
        {...triggerProps({ class: clsx(styles.closeTrigger, className) })}
        {children}
        aria-label={resolvedAriaLabel}
        aria-labelledby={ariaLabelledby}
        data-slot="toast-close-trigger"
      />
    {/snippet}
  </ToastCloseTrigger>
{/if}