<script lang="ts">
  import { QrCode, QrCodeFrame, QrCodeOverlay, QrCodePattern } from '@moduix/svelte/qr-code';
</script>

<QrCode defaultValue="https://moduix.dev/docs/qr-code" encoding={{ ecc: 'H' }}>
  <QrCodeFrame>
    <QrCodePattern />
  </QrCodeFrame>
  <QrCodeOverlay>MX</QrCodeOverlay>
</QrCode>