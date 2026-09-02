import { Skeleton } from '@moduix/react/skeleton';
import { Stack } from '@moduix/react/stack';
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
    <Stack className={styles.root} gap={12}>
      {announcements.map((item) => (
        <Stack
          key={item.titleWidth}
          direction={{
            mobile: 'column',
            desktop: 'row',
          }}
          gap={12}
        >
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