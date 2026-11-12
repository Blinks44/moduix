<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/svelte/qr-code';
  import { Stack } from '@moduix/svelte/stack';

  const errorLevels = ['L', 'M', 'Q', 'H'] as const;
  type ErrorLevel = (typeof errorLevels)[number];

  let errorLevel = $state<ErrorLevel>('L');
</script>

<Stack align="center" gap="3">
  <QrCode defaultValue="https://moduix.dev/docs/qr-code" encoding={{ ecc: errorLevel }}>
    <QrCodeFrame>
      <QrCodePattern />
    </QrCodeFrame>
  </QrCode>
  <div data-preview-meta>
    <output>Error correction: {errorLevel}</output>
    {#each errorLevels as level (level)}
      <Button
        size="sm"
        variant={level === errorLevel ? 'default' : 'outline'}
        onclick={() => (errorLevel = level)}
      >
        {level}
      </Button>
    {/each}
  </div>
</Stack>