<script module lang="ts">
  import type { TourCloseTriggerProps } from '@ark-ui/svelte/tour';

  export type TourCloseIconProps = Omit<TourCloseTriggerProps, 'asChild'>;
</script>

<script lang="ts">
  import { TourCloseTrigger } from '@ark-ui/svelte/tour';
  import { clsx } from 'clsx';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import CloseButton from '../close-button/CloseButton.svelte';
  import styles from './Tour.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    ...props
  }: TourCloseIconProps = $props();
</script>

<TourCloseTrigger {...props} bind:ref>
  {#snippet asChild(triggerProps)}
    <CloseButton
      {...triggerProps()}
      aria-label={ariaLabel ?? a11yLabels.closeTour}
      class={clsx(styles.closeIcon, className)}
      data-slot="tour-close-icon"
      {children}
    />
  {/snippet}
</TourCloseTrigger>