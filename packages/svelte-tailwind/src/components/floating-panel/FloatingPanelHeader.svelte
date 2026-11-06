<script lang="ts">
  import {
    FloatingPanelHeader,
    type FloatingPanelHeaderProps,
  } from '@ark-ui/svelte/floating-panel';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: FloatingPanelHeaderProps = $props();

  const headerClass =
    'flex min-h-control-xl cursor-grab items-center justify-between gap-3 border-b border-border bg-muted px-3 py-2 select-none data-dragging:cursor-grabbing data-minimized:border-b-transparent';
</script>

<FloatingPanelHeader
  {...props}
  bind:ref
  class={cn(headerClass, className)}
  data-slot="floating-panel-header"
/>