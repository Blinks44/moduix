<script lang="ts">
  import {
    ColorPickerPositioner,
    type ColorPickerPositionerProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';
  import styles from './ColorPicker.module.css';

  let { class: className, ref = $bindable(null), ...props }: ColorPickerPositionerProps = $props();
</script>

<OverlayPortal>
  <ColorPickerPositioner
    {...props}
    bind:ref
    class={clsx(styles.positioner, className)}
    data-slot="color-picker-positioner"
  />
</OverlayPortal>