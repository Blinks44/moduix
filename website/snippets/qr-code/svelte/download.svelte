<script lang="ts">
  import {
    QrCode,
    QrCodeDownloadTrigger,
    QrCodeFrame,
    QrCodePattern,
  } from '@moduix/svelte/qr-code';
</script>

<QrCode defaultValue="https://moduix.dev/docs/qr-code">
  <QrCodeFrame role="img" aria-label="QR code for moduix QR Code documentation">
    <QrCodePattern />
  </QrCodeFrame>
  <QrCodeDownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
    Download QR code (PNG)
  </QrCodeDownloadTrigger>
</QrCode>