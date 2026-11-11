<script lang="ts">
  import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/svelte/qr-code';

  const destinations = [
    { label: 'ark-ui.com', value: 'https://ark-ui.com' },
    { label: 'moduix.dev', value: 'https://moduix.dev' },
  ];
  let value = $state(destinations[0].value);
</script>

<QrCode bind:value>
  <QrCodeFrame>
    <QrCodePattern />
  </QrCodeFrame>
</QrCode>
<output>Encoded URL: {value}</output>
{#each destinations as destination (destination.value)}
  <button type="button" onclick={() => (value = destination.value)}>
    {destination.label}
  </button>
{/each}