<script lang="ts">
  import {
    FloatingPanelTrigger,
    type FloatingPanelTriggerProps,
  } from '@ark-ui/svelte/floating-panel';

  let { class: className, ref = $bindable(null), ...props }: FloatingPanelTriggerProps = $props();
</script>

<FloatingPanelTrigger {...props} bind:ref class={className} data-slot="floating-panel-trigger" />