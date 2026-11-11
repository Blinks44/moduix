<script lang="ts">
  import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/svelte/qr-code';

  const fills = [
    { label: 'Primary', color: 'var(--moduix-primary)' },
    { label: 'Danger', color: 'var(--moduix-destructive)' },
  ];
</script>

{#each fills as fill (fill.label)}
  <QrCode defaultValue="https://moduix.dev/docs/qr-code">
    <QrCodeFrame style="color: {fill.color}" role="img" aria-label="{fill.label} QR code">
      <QrCodePattern />
    </QrCodeFrame>
  </QrCode>
{/each}