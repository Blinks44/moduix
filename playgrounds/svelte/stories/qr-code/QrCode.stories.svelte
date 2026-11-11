<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    QrCode,
    QrCodeContext,
    QrCodeDownloadTrigger,
    QrCodeFrame,
    QrCodeOverlay,
    QrCodePattern,
    QrCodeRootProvider,
    useQrCode,
  } from '@/components/qr-code';
  import styles from './QrCode.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/QrCode',
    component: QrCode,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let value = $state('https://ark-ui.com');
  const qrCode = useQrCode({
    id: 'qr-code-root-provider',
    value: 'https://moduix.dev/docs/qr-code',
  });
</script>

<Story name="Basic" asChild>
  <QrCode defaultValue="https://moduix.dev/docs/qr-code">
    <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
      <QrCodePattern />
    </QrCodeFrame>
  </QrCode>
</Story>

<Story name="Controlled" asChild>
  <div class={styles.stack}>
    <QrCode bind:value>
      <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
        <QrCodePattern />
      </QrCodeFrame>
    </QrCode>
    <div class={styles.actions}>
      <button class={styles.action} type="button" onclick={() => (value = 'https://chakra-ui.com')}>
        Chakra UI
      </button>
      <button class={styles.action} type="button" onclick={() => (value = 'https://moduix.dev')}>
        moduix
      </button>
    </div>
  </div>
</Story>

<Story name="Error Correction" exportName="ErrorCorrection" asChild>
  <QrCode defaultValue="https://moduix.dev/docs/qr-code" encoding={{ ecc: 'H' }}>
    <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
      <QrCodePattern />
    </QrCodeFrame>
  </QrCode>
</Story>

<Story name="Overlay" asChild>
  <QrCode defaultValue="https://moduix.dev/docs/qr-code" encoding={{ ecc: 'H' }}>
    <QrCodeFrame class={styles.brandFrame}>
      <QrCodePattern />
    </QrCodeFrame>
    <QrCodeOverlay class={styles.overlay}>MX</QrCodeOverlay>
  </QrCode>
</Story>

<Story name="Download" asChild>
  <QrCode defaultValue="https://moduix.dev/docs/qr-code">
    <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
      <QrCodePattern />
    </QrCodeFrame>
    <QrCodeDownloadTrigger fileName="moduix-qr-code.png" mimeType="image/png">
      Download
    </QrCodeDownloadTrigger>
  </QrCode>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <div class={styles.stack}>
    <QrCodeRootProvider value={qrCode}>
      <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeContext>
        {#snippet render(context)}
          <output class={styles.hint}>{context().value}</output>
        {/snippet}
      </QrCodeContext>
    </QrCodeRootProvider>
  </div>
</Story>