<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/svelte/qr-code';
  import { Stack } from '@moduix/svelte/stack';

  const destinations = ['https://ark-ui.com', 'https://moduix.dev'];
  let value = $state(destinations[0]);
</script>

<Stack align="center" gap="3">
  <QrCode bind:value>
    <QrCodeFrame>
      <QrCodePattern />
    </QrCodeFrame>
  </QrCode>
  <div data-preview-meta>
    <output>Encoded URL: {value}</output>
    {#each destinations as destination (destination)}
      <Button size="sm" variant="outline" onclick={() => (value = destination)}>
        {new URL(destination).hostname}
      </Button>
    {/each}
  </div>
</Stack>