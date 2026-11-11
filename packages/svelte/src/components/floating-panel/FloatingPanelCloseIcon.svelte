<script lang="ts">
  import {
    FloatingPanelCloseTrigger,
    type FloatingPanelCloseTriggerProps,
  } from '@ark-ui/svelte/floating-panel';
  import { clsx } from 'clsx';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import CloseButton from '../close-button/CloseButton.svelte';
  import styles from './FloatingPanel.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    ...props
  }: Omit<FloatingPanelCloseTriggerProps, 'asChild'> = $props();
</script>

<FloatingPanelCloseTrigger {...props} bind:ref>
  {#snippet asChild(triggerProps)}
    <CloseButton
      {...triggerProps()}
      aria-label={ariaLabel ?? a11yLabels.closePanel}
      class={clsx(styles.controlButton, className)}
      data-slot="floating-panel-close-icon"
      {children}
    />
  {/snippet}
</FloatingPanelCloseTrigger>