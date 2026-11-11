<script lang="ts">
  import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/svelte/qr-code';

  let value = $state('https://moduix.dev/docs/qr-code');
</script>

<input bind:value aria-label="QR code content" />
<QrCode bind:value>
  <QrCodeFrame role="img" aria-label="QR code for the entered content">
    <QrCodePattern />
  </QrCodeFrame>
</QrCode>
<output>Encoded content: {value || 'empty'}</output>