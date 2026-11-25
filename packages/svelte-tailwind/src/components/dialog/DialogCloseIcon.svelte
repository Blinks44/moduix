<script lang="ts">
  import { DialogCloseTrigger, type DialogCloseTriggerProps } from '@ark-ui/svelte/dialog';
  import { useA11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import CloseButton from '../close-button/CloseButton.svelte';

  let {
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    ...props
  }: Omit<DialogCloseTriggerProps, 'asChild'> = $props();

  const labels = useA11yLabels();
</script>

<DialogCloseTrigger {...props} bind:ref>
  {#snippet asChild(triggerProps)}
    <CloseButton
      {...triggerProps()}
      aria-label={ariaLabel ?? labels().closeDialog}
      class={cn(
        'absolute end-4 top-4 z-2 rounded-md not-data-disabled:hover:bg-accent not-data-disabled:hover:text-popover-foreground',
        className,
      )}
      data-slot="dialog-close-icon"
      {children}
    />
  {/snippet}
</DialogCloseTrigger>