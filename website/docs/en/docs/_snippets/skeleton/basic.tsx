import { Skeleton } from '@moduix/react/skeleton';
import { Stack } from '@moduix/react/stack';
import styles from '@/components/examples/skeleton/skeleton-basic.module.css';

const lines = [
  {
    width: '100%',
    height: 18,
  },
  {
    width: '86%',
    height: 18,
  },
  {
    width: '64%',
    height: 18,
  },
];

export default function SkeletonDemo() {
  return (
    <Stack className={styles.root} gap={10}>
      {lines.map((line) => (
        <Skeleton key={line.width} width={line.width} height={line.height} />
      ))}
    </Stack>
  );
}