import { Skeleton } from '@moduix/solid/skeleton';
import { Stack } from '@moduix/solid/stack';
import styles from '@/components/examples/skeleton/skeleton-responsive-layout.module.css';

const announcements = [
  {
    titleWidth: '62%',
  },
  {
    titleWidth: '48%',
  },
];

export default function SkeletonCompositionDemo() {
  return (
    <Stack class={styles.root} gap={12}>
      {announcements.map((item) => (
        <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12}>
          <Skeleton width={72} height={48} />
          <Stack gap={8} fill>
            <Skeleton width={item.titleWidth} height={14} />
            <Skeleton height={14} />
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}