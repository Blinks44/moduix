<script lang="ts">
  import type { FloatingPanelResizeTriggerAxis } from '@ark-ui/svelte/floating-panel';
  import { resizeTriggerAxes } from './floating-panel.types';
  import FloatingPanelResizeTrigger from './FloatingPanelResizeTrigger.svelte';

  let { axes = resizeTriggerAxes }: { axes?: readonly FloatingPanelResizeTriggerAxis[] } = $props();
</script>

{#each axes as axis (axis)}
  <FloatingPanelResizeTrigger {axis} />
{/each}