<script lang="ts">
  import { Skeleton } from '@moduix/svelte/skeleton';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/skeleton/skeleton-basic.module.css';

  const lines = [
    { width: '100%', height: 18 },
    { width: '86%', height: 18 },
    { width: '64%', height: 18 },
  ];
</script>

<Stack class={styles.root} gap={10}>
  {#each lines as line (line.width)}
    <Skeleton width={line.width} height={line.height} />
  {/each}
</Stack>