<script lang="ts">
  import {
    ColorPickerPositioner,
    type ColorPickerPositionerProps,
  } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';

  let { class: className, ref = $bindable(null), ...props }: ColorPickerPositionerProps = $props();
</script>

<OverlayPortal>
  <ColorPickerPositioner
    {...props}
    bind:ref
    class={cn('z-(--z-index) outline-0', className)}
    data-slot="color-picker-positioner"
  />
</OverlayPortal>