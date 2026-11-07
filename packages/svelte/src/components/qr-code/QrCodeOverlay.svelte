<script lang="ts">
  import { QrCodeOverlay, type QrCodeOverlayProps } from '@ark-ui/svelte/qr-code';
  import { clsx } from 'clsx';
  import styles from './QrCode.module.css';

  let { class: className, ref = $bindable(null), ...props }: QrCodeOverlayProps = $props();
</script>

<QrCodeOverlay
  {...props}
  bind:ref
  class={clsx(styles.overlay, className)}
  data-slot="qr-code-overlay"
/>