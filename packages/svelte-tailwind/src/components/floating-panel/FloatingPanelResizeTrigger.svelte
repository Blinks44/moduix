<script lang="ts">
  import {
    FloatingPanelResizeTrigger,
    type FloatingPanelResizeTriggerProps,
  } from '@ark-ui/svelte/floating-panel';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: FloatingPanelResizeTriggerProps = $props();

  const resizeTriggerClass =
    'data-disabled:pointer-events-none data-[axis=e]:w-2 data-[axis=n]:h-2 data-[axis=ne]:size-3 data-[axis=nw]:size-3 data-[axis=s]:h-2 data-[axis=se]:size-3 data-[axis=sw]:size-3 data-[axis=w]:w-2';
</script>

<FloatingPanelResizeTrigger
  {...props}
  bind:ref
  class={cn(resizeTriggerClass, className)}
  data-slot="floating-panel-resize-trigger"
/>