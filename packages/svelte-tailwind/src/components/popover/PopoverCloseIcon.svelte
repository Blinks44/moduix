<script lang="ts">
  import { PopoverCloseTrigger, type PopoverCloseTriggerProps } from '@ark-ui/svelte/popover';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import CloseButton from '../close-button/CloseButton.svelte';

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
      class={cn(
        'absolute end-3 top-3 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
        className,
      )}
      data-slot="popover-close-icon"
      {children}
    />
  {/snippet}
</PopoverCloseTrigger>