<script lang="ts">
  import { Kbd, KbdGroup } from '@moduix/svelte/kbd';
  import styles from '@/components/examples/kbd/kbd-basic.module.css';

  const shortcut = {
    label: 'Command K',
    keys: ['Cmd', 'K'],
  };
</script>

<div class={styles.root}>
  <KbdGroup aria-label={shortcut.label}>
    {#each shortcut.keys as key, index (key)}
      {#if index > 0}+{/if}
      <Kbd>{key}</Kbd>
    {/each}
  </KbdGroup>
</div>