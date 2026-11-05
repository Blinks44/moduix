<script lang="ts">
  import { DialogBackdrop, type DialogBackdropProps } from '@ark-ui/svelte/dialog';
  import { clsx } from 'clsx';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';
  import styles from './Dialog.module.css';

  let { class: className, ref = $bindable(null), ...props }: DialogBackdropProps = $props();
</script>

<OverlayPortal>
  <DialogBackdrop
    {...props}
    bind:ref
    class={clsx(styles.backdrop, className)}
    data-slot="dialog-backdrop"
  />
</OverlayPortal>