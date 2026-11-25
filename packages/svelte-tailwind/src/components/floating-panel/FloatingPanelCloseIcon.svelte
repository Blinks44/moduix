<script lang="ts">
  import {
    FloatingPanelCloseTrigger,
    type FloatingPanelCloseTriggerProps,
  } from '@ark-ui/svelte/floating-panel';
  import { useA11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import CloseButton from '../close-button/CloseButton.svelte';
  import { controlButtonClass } from './floating-panel.types';

  let {
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    ...props
  }: Omit<FloatingPanelCloseTriggerProps, 'asChild'> = $props();

  const labels = useA11yLabels();
</script>

<FloatingPanelCloseTrigger {...props} bind:ref>
  {#snippet asChild(triggerProps)}
    <CloseButton
      {...triggerProps()}
      aria-label={ariaLabel ?? labels().closePanel}
      class={cn(controlButtonClass, className)}
      data-slot="floating-panel-close-icon"
      {children}
    />
  {/snippet}
</FloatingPanelCloseTrigger>