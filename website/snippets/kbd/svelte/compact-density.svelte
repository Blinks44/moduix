<script lang="ts">
  import { Kbd } from '@moduix/svelte/kbd';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/kbd/kbd-compact-density.module.css';

  const keys = ['Esc', 'Ctrl', '/'];
</script>

<Stack direction="row" align="center" wrap="wrap" gap="2">
  {#each keys as key (key)}
    <Kbd class={styles.dense}>{key}</Kbd>
  {/each}
</Stack>