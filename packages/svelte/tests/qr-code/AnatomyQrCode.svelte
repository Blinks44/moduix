<script lang="ts">
  import {
    QrCode,
    QrCodeDownloadTrigger,
    QrCodeFrame,
    QrCodeOverlay,
    QrCodePattern,
  } from '@/components/qr-code';

  let rootRef = $state<HTMLElement | null>(null);
  let frameRef = $state<HTMLElement | null>(null);
  let patternRef = $state<SVGPathElement | null>(null);

  export const getRefs = () => ({ frameRef, patternRef, rootRef });
</script>

<QrCode bind:ref={rootRef} defaultValue="https://moduix.dev/docs/qr-code">
  <QrCodeFrame bind:ref={frameRef} role="img" aria-label="QR code for moduix documentation">
    <QrCodePattern bind:ref={patternRef} />
  </QrCodeFrame>
  <QrCodeOverlay>MX</QrCodeOverlay>
  <QrCodeDownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
    Download PNG
  </QrCodeDownloadTrigger>
</QrCode>