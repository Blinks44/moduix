<script lang="ts">
  import { QrCodeFrame, type QrCodeFrameProps } from '@ark-ui/svelte/qr-code';
  import { clsx } from 'clsx';
  import styles from './QrCode.module.css';

  let { class: className, ref = $bindable(null), ...props }: QrCodeFrameProps = $props();
</script>

<QrCodeFrame {...props} bind:ref class={clsx(styles.frame, className)} data-slot="qr-code-frame" />