<script lang="ts">
  import {
    FloatingPanelCloseTrigger,
    type FloatingPanelCloseTriggerProps,
  } from '@ark-ui/svelte/floating-panel';
  import { cn } from '@/lib/moduix/cn';
  import { controlButtonClass } from './floating-panel.types';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: FloatingPanelCloseTriggerProps = $props();
</script>

<FloatingPanelCloseTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(!asChild && controlButtonClass, className)}
  data-slot="floating-panel-close-trigger"
/>