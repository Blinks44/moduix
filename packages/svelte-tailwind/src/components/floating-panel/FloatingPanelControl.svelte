<script lang="ts">
  import {
    FloatingPanelControl,
    type FloatingPanelControlProps,
  } from '@ark-ui/svelte/floating-panel';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: FloatingPanelControlProps = $props();
</script>

<FloatingPanelControl
  {...props}
  bind:ref
  class={cn('inline-flex flex-none items-center gap-1', className)}
  data-slot="floating-panel-control"
/>