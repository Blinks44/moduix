<script lang="ts">
  import { Skeleton } from '@moduix/svelte/skeleton';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/skeleton/skeleton-variants.module.css';

  const variants = ['pulse', 'none'] as const;
</script>

<Stack class={styles.root} gap={12}>
  {#each variants as variant (variant)}
    <Skeleton height={18} {variant} />
  {/each}
</Stack>