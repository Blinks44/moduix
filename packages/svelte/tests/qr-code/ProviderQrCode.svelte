<script lang="ts">
  import {
    QrCodeContext,
    QrCodeFrame,
    QrCodePattern,
    QrCodeRootProvider,
    useQrCode,
  } from '@/components/qr-code';
  import QrCodeValue from './QrCodeValue.svelte';

  const qrCode = useQrCode({
    id: 'provider-qr-code',
    defaultValue: 'https://moduix.dev/docs/qr-code',
  });
</script>

<QrCodeRootProvider value={qrCode} data-testid="qr-code-provider">
  <QrCodeFrame><QrCodePattern /></QrCodeFrame>
  <QrCodeValue />
  <QrCodeContext>
    {#snippet render(context)}
      <output>Context: {context().value}</output>
      <button type="button" onclick={() => context().setValue('https://chakra-ui.com')}>
        Change context value
      </button>
    {/snippet}
  </QrCodeContext>
</QrCodeRootProvider>