<script lang="ts">
  import { Skeleton } from '@moduix/svelte/skeleton';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/skeleton/skeleton-card.module.css';

  const cardSkeleton = { mediaHeight: 148, titleWidth: '70%', bodyWidth: '82%' };
</script>

<Stack class={styles.root} gap={16}>
  <Skeleton height={cardSkeleton.mediaHeight} borderRadius="var(--moduix-radius-lg)" />
  <Stack gap={12}>
    <Skeleton width={cardSkeleton.titleWidth} height={20} />
    <Skeleton height={14} />
    <Skeleton width={cardSkeleton.bodyWidth} height={14} />
  </Stack>
</Stack>