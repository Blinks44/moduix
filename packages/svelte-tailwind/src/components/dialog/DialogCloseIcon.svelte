<script lang="ts">
  import { DialogCloseTrigger, type DialogCloseTriggerProps } from '@ark-ui/svelte/dialog';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import CloseButton from '../close-button/CloseButton.svelte';

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
      class={cn(
        'absolute end-4 top-4 z-2 rounded-md [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
        className,
      )}
      data-slot="dialog-close-icon"
      {children}
    />
  {/snippet}
</DialogCloseTrigger>