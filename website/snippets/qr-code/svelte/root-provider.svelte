<script lang="ts">
  import {
    QrCodeFrame,
    QrCodePattern,
    QrCodeRootProvider,
    useQrCode,
  } from '@moduix/svelte/qr-code';
  import { Stack } from '@moduix/svelte/stack';

  const id = $props.id();
  const qrCode = useQrCode({
    id,
    value: 'https://moduix.dev/docs/qr-code',
  });
</script>

<Stack align="center" gap="3">
  <QrCodeRootProvider value={qrCode}>
    <QrCodeFrame>
      <QrCodePattern />
    </QrCodeFrame>
  </QrCodeRootProvider>
  <div data-preview-meta>
    <output>Encoded URL: {qrCode().value}</output>
  </div>
</Stack>