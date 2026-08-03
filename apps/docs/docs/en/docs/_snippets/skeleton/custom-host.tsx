import { Skeleton } from '@moduix/react/skeleton';

const loadingRegion = {
  label: 'Loading summary',
};

export default function SkeletonAsChildDemo() {
  return (
    <Skeleton asChild height={72} borderRadius="var(--moduix-radius-lg)">
      <section aria-label={loadingRegion.label} />
    </Skeleton>
  );
}