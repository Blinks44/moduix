<script lang="ts">
  import { Input } from '@moduix/svelte/input';
  import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/svelte/qr-code';
  import styles from '@/components/examples/qr-code/component-input.module.css';

  let value = $state('https://moduix.dev/docs/qr-code');
</script>

<div class={styles.stack}>
  <Input bind:value aria-label="QR code content" class={styles.input} />
  <QrCode bind:value>
    <QrCodeFrame role="img" aria-label="QR code for the entered content">
      <QrCodePattern />
    </QrCodeFrame>
  </QrCode>
  <div data-preview-meta>
    <output>Encoded content: {value || 'empty'}</output>
  </div>
</div>