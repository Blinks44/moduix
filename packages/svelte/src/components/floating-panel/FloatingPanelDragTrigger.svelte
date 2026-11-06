<script lang="ts">
  import {
    FloatingPanelDragTrigger,
    type FloatingPanelDragTriggerProps,
  } from '@ark-ui/svelte/floating-panel';

  let { ref = $bindable(null), ...props }: FloatingPanelDragTriggerProps = $props();
</script>

<FloatingPanelDragTrigger {...props} bind:ref data-slot="floating-panel-drag-trigger" />