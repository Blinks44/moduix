import { Button } from '@moduix/react/button';
import { Skeleton } from '@moduix/react/skeleton';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/skeleton/skeleton-loaded-content.module.css';

const profile = {
  name: 'Ada Lovelace',
  role: 'Analytical engine notes',
};

export default function LoadedSkeletonDemo() {
  const [loading, setLoading] = useState(true);

  return (
    <section aria-label="Profile" aria-busy={loading} className={styles.root}>
      <Skeleton loading={loading} className={styles.skeleton}>
        <strong>{profile.name}</strong>
        <span className={styles.role}>{profile.role}</span>
      </Skeleton>
      <PreviewMeta>
        <output>Profile: {loading ? 'loading' : 'loaded'}</output>
        <Button size="sm" type="button" onClick={() => setLoading(!loading)}>
          {loading ? 'Show profile' : 'Show skeleton'}
        </Button>
      </PreviewMeta>
    </section>
  );
}