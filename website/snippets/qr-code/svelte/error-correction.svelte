<script lang="ts">
  import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/svelte/qr-code';

  const errorLevels = ['L', 'M', 'Q', 'H'] as const;
  type ErrorLevel = (typeof errorLevels)[number];

  let errorLevel = $state<ErrorLevel>('L');
</script>

<QrCode defaultValue="https://moduix.dev/docs/qr-code" encoding={{ ecc: errorLevel }}>
  <QrCodeFrame>
    <QrCodePattern />
  </QrCodeFrame>
</QrCode>
<output>Error correction: {errorLevel}</output>
{#each errorLevels as level (level)}
  <button type="button" aria-pressed={level === errorLevel} onclick={() => (errorLevel = level)}>
    {level}
  </button>
{/each}