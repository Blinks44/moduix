<script lang="ts">
  import { DialogCloseTrigger, type DialogCloseTriggerProps } from '@ark-ui/svelte/dialog';
  import { clsx } from 'clsx';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import CloseButton from '../close-button/CloseButton.svelte';
  import styles from './Dialog.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    ...props
  }: Omit<DialogCloseTriggerProps, 'asChild'> = $props();
</script>

<DialogCloseTrigger {...props} bind:ref>
  {#snippet asChild(triggerProps)}
    <CloseButton
      {...triggerProps()}
      aria-label={ariaLabel ?? a11yLabels.closeDialog}
      class={clsx(styles.closeIcon, className)}
      data-slot="dialog-close-icon"
      {children}
    />
  {/snippet}
</DialogCloseTrigger>