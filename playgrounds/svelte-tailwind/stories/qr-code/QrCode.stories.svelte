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

  const stackClass = 'grid justify-items-center gap-3';
  const actionClass =
    'inline-flex min-h-control-lg items-center justify-center rounded-md border border-border bg-background px-4 text-sm leading-5 text-foreground focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring';

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
  <div class={stackClass}>
    <QrCode bind:value>
      <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
        <QrCodePattern />
      </QrCodeFrame>
    </QrCode>
    <div class="flex flex-wrap justify-center gap-2">
      <button class={actionClass} type="button" onclick={() => (value = 'https://chakra-ui.com')}>
        Chakra UI
      </button>
      <button class={actionClass} type="button" onclick={() => (value = 'https://moduix.dev')}>
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
    <QrCodeFrame class="text-primary">
      <QrCodePattern />
    </QrCodeFrame>
    <QrCodeOverlay class="text-xs leading-4 font-semibold">MX</QrCodeOverlay>
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
  <div class={stackClass}>
    <QrCodeRootProvider value={qrCode}>
      <QrCodeFrame role="img" aria-label="QR code for moduix documentation">
        <QrCodePattern />
      </QrCodeFrame>
      <QrCodeContext>
        {#snippet render(context)}
          <output class="m-0 text-sm leading-5 text-muted-foreground">{context().value}</output>
        {/snippet}
      </QrCodeContext>
    </QrCodeRootProvider>
  </div>
</Story>