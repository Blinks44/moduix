<script lang="ts">
  import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/svelte/qr-code';
</script>

<QrCode defaultValue="https://moduix.dev/docs/qr-code">
  <QrCodeFrame role="img" aria-label="QR code for moduix QR Code documentation">
    <QrCodePattern />
  </QrCodeFrame>
</QrCode>