<script lang="ts">
  import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/svelte/qr-code';
  import styles from '@/components/examples/qr-code/component-fill.module.css';

  const fills = [
    {
      label: 'Primary',
      class: styles.primary,
    },
    {
      label: 'Danger',
      class: styles.danger,
    },
  ];
</script>

<div class={styles.grid}>
  {#each fills as fill (fill.label)}
    <QrCode defaultValue="https://moduix.dev/docs/qr-code">
      <QrCodeFrame class={fill.class}>
        <QrCodePattern />
      </QrCodeFrame>
    </QrCode>
  {/each}
</div>