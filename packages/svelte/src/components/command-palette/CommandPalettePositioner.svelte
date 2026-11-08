<script lang="ts">
  import {
    Positioner as DialogPositioner,
    type DialogPositionerProps,
  } from '@ark-ui/svelte/dialog';
  import { clsx } from 'clsx';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';
  import styles from './CommandPalette.module.css';

  let { class: className, ref = $bindable(null), ...props }: DialogPositionerProps = $props();
</script>

<OverlayPortal>
  <DialogPositioner
    {...props}
    bind:ref
    class={clsx(styles.positioner, className)}
    data-slot="command-palette-positioner"
  />
</OverlayPortal>