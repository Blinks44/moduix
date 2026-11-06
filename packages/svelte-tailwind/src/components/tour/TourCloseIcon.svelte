<script module lang="ts">
  import type { TourCloseTriggerProps } from '@ark-ui/svelte/tour';

  export type TourCloseIconProps = Omit<TourCloseTriggerProps, 'asChild'>;
</script>

<script lang="ts">
  import { TourCloseTrigger } from '@ark-ui/svelte/tour';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import CloseButton from '../close-button/CloseButton.svelte';

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
      class={cn(
        'absolute end-4 top-4 rounded-md [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
        className,
      )}
      data-slot="tour-close-icon"
      {children}
    />
  {/snippet}
</TourCloseTrigger>