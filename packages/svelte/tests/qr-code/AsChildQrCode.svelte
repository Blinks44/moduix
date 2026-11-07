<script lang="ts">
  import { QrCode, QrCodeDownloadTrigger, QrCodeFrame, QrCodePattern } from '@/components/qr-code';

  let rootRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ rootRef });
</script>

<QrCode bind:ref={rootRef} defaultValue="https://moduix.dev/docs/qr-code">
  {#snippet asChild(props)}
    <section {...props()} aria-label="QR code">
      <QrCodeFrame><QrCodePattern /></QrCodeFrame>
    </section>
  {/snippet}
</QrCode>
<QrCode defaultValue="https://moduix.dev/docs/qr-code">
  <QrCodeFrame><QrCodePattern /></QrCodeFrame>
  <QrCodeDownloadTrigger fileName="moduix-qr-code.svg" mimeType="image/svg+xml">
    {#snippet asChild(props)}
      <a {...props()} href="#download">Download SVG</a>
    {/snippet}
  </QrCodeDownloadTrigger>
</QrCode>