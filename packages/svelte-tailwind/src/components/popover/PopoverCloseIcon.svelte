<script lang="ts">
  import { PopoverCloseTrigger, type PopoverCloseTriggerProps } from '@ark-ui/svelte/popover';
  import { useA11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import CloseButton from '../close-button/CloseButton.svelte';

  let {
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    ...props
  }: Omit<PopoverCloseTriggerProps, 'asChild'> = $props();

  const labels = useA11yLabels();
</script>

<PopoverCloseTrigger {...props} bind:ref>
  {#snippet asChild(triggerProps)}
    <CloseButton
      {...triggerProps()}
      aria-label={ariaLabel ?? labels().closePopover}
      class={cn(
        'absolute end-3 top-3 not-data-disabled:hover:bg-accent not-data-disabled:hover:text-popover-foreground',
        className,
      )}
      data-slot="popover-close-icon"
      {children}
    />
  {/snippet}
</PopoverCloseTrigger>