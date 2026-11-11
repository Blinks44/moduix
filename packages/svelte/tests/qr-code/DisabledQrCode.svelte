<script lang="ts">
  import { QrCode, QrCodeDownloadTrigger, QrCodeFrame, QrCodePattern } from '@/components/qr-code';
</script>

<QrCode defaultValue="https://moduix.dev/docs/qr-code">
  <QrCodeFrame><QrCodePattern /></QrCodeFrame>
  <QrCodeDownloadTrigger disabled fileName="moduix-qr-code.png" mimeType="image/png">
    Download PNG
  </QrCodeDownloadTrigger>
</QrCode>