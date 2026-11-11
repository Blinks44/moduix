<script lang="ts">
  import {
    QrCode,
    QrCodeDownloadTrigger,
    QrCodeFrame,
    QrCodeOverlay,
    QrCodePattern,
  } from '@/components/qr-code';
</script>

<QrCode class="w-48 gap-4 text-primary">
  <QrCodeFrame class="w-1/2"><QrCodePattern /></QrCodeFrame>
  <QrCodeOverlay class="size-control-xl bg-muted p-2" />
  <QrCodeDownloadTrigger
    class="rounded-lg bg-muted px-2"
    fileName="moduix-qr-code.png"
    mimeType="image/png"
  />
</QrCode>