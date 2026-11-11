<script lang="ts">
  import { DialogCloseTrigger, type DialogCloseTriggerProps } from '@ark-ui/svelte/dialog';
  import { clsx } from 'clsx';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import CloseButton from '../close-button/CloseButton.svelte';
  import styles from './Lightbox.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...props
  }: Omit<DialogCloseTriggerProps, 'asChild'> = $props();
</script>

<DialogCloseTrigger {...props} bind:ref>
  {#snippet asChild(triggerProps)}
    <CloseButton
      {...triggerProps()}
      aria-label={ariaLabel ?? a11yLabels.closeImage}
      aria-labelledby={ariaLabelledby}
      class={clsx(styles.closeIcon, className)}
      data-slot="lightbox-close-icon"
      {children}
    />
  {/snippet}
</DialogCloseTrigger>