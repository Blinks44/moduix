<script lang="ts">
  import { QrCode, QrCodeFrame, QrCodeOverlay, QrCodePattern } from '@/components/qr-code';
</script>

<QrCode defaultValue="https://moduix.dev/docs/qr-code">
  <QrCodeFrame role="img" aria-label="Hydrated QR code"><QrCodePattern /></QrCodeFrame>
  <QrCodeOverlay>MX</QrCodeOverlay>
</QrCode>