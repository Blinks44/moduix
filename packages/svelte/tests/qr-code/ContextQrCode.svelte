<script lang="ts">
  import {
    QrCode,
    QrCodeContext,
    QrCodeFrame,
    QrCodePattern,
    type QrCodeValueChangeDetails,
  } from '@/components/qr-code';

  let { onValueChange }: { onValueChange?: (details: QrCodeValueChangeDetails) => void } = $props();

  let value = $state('https://moduix.dev/docs/qr-code');
</script>

<QrCode bind:value {onValueChange}>
  <QrCodeFrame><QrCodePattern /></QrCodeFrame>
  <QrCodeContext>
    {#snippet render(context)}
      <output>Parent value: {value}</output>
      <button type="button" onclick={() => context().setValue('https://chakra-ui.com')}>
        Change context value
      </button>
    {/snippet}
  </QrCodeContext>
</QrCode>