<script lang="ts">
  import {
    FloatingPanelPositioner,
    type FloatingPanelPositionerProps,
  } from '@ark-ui/svelte/floating-panel';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';

  let { ref = $bindable(null), ...props }: FloatingPanelPositionerProps = $props();
</script>

<OverlayPortal>
  <FloatingPanelPositioner {...props} bind:ref data-slot="floating-panel-positioner" />
</OverlayPortal>