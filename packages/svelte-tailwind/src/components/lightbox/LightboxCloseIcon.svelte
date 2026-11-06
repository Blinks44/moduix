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
      class={cn(
        'fixed end-4 top-4 z-[calc(var(--moduix-z-popup)+var(--layer-index,0)+1)] size-8 bg-background text-foreground',
        className,
      )}
      data-slot="lightbox-close-icon"
      {children}
    />
  {/snippet}
</DialogCloseTrigger>