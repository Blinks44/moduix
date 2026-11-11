<script lang="ts">
  import { Skeleton } from '@moduix/svelte/skeleton';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/skeleton/skeleton-responsive-layout.module.css';

  const announcements = [{ titleWidth: '62%' }, { titleWidth: '48%' }];
</script>

<Stack class={styles.root} gap={12}>
  {#each announcements as item (item.titleWidth)}
    <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12}>
      <Skeleton width={72} height={48} />
      <Stack gap={8} fill>
        <Skeleton width={item.titleWidth} height={14} />
        <Skeleton height={14} />
      </Stack>
    </Stack>
  {/each}
</Stack>