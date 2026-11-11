<script lang="ts">
  import { PopoverCloseTrigger, type PopoverCloseTriggerProps } from '@ark-ui/svelte/popover';
  import { clsx } from 'clsx';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import CloseButton from '../close-button/CloseButton.svelte';
  import styles from './Popover.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    ...props
  }: Omit<PopoverCloseTriggerProps, 'asChild'> = $props();
</script>

<PopoverCloseTrigger {...props} bind:ref>
  {#snippet asChild(triggerProps)}
    <CloseButton
      {...triggerProps()}
      aria-label={ariaLabel ?? a11yLabels.closePopover}
      class={clsx(styles.closeIcon, className)}
      data-slot="popover-close-icon"
      {children}
    />
  {/snippet}
</PopoverCloseTrigger>