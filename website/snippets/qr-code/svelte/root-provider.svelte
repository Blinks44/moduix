<script lang="ts">
  import {
    QrCodeFrame,
    QrCodePattern,
    QrCodeRootProvider,
    useQrCode,
  } from '@moduix/svelte/qr-code';

  const id = $props.id();
  const qrCode = useQrCode({
    id,
    value: 'https://moduix.dev/docs/qr-code',
  });
</script>

<QrCodeRootProvider value={qrCode}>
  <QrCodeFrame>
    <QrCodePattern />
  </QrCodeFrame>
</QrCodeRootProvider>
<output>Encoded URL: {qrCode().value}</output>