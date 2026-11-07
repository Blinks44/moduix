<script lang="ts">
  import { QrCodeDownloadTrigger, type QrCodeDownloadTriggerProps } from '@ark-ui/svelte/qr-code';
  import { clsx } from 'clsx';
  import styles from './QrCode.module.css';

  let { class: className, ref = $bindable(null), ...props }: QrCodeDownloadTriggerProps = $props();
</script>

<QrCodeDownloadTrigger
  {...props}
  bind:ref
  class={clsx(styles.downloadTrigger, className)}
  data-slot="qr-code-download-trigger"
/>