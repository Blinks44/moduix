import { Button } from '@moduix/solid/button';
import { Skeleton } from '@moduix/solid/skeleton';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/skeleton/skeleton-loaded-content.module.css';

const profile = {
  name: 'Ada Lovelace',
  role: 'Analytical engine notes',
};

export default function LoadedSkeletonDemo() {
  const [loading, setLoading] = createSignal(true);

  return (
    <section aria-label="Profile" aria-busy={loading()} class={styles.root}>
      <Skeleton loading={loading()} class={styles.skeleton}>
        <strong>{profile.name}</strong>
        <span class={styles.role}>{profile.role}</span>
      </Skeleton>
      <div>
        <output>Profile: {loading() ? 'loading' : 'loaded'}</output>
        <Button size="sm" type="button" onClick={() => setLoading(!loading())}>
          {loading() ? 'Show profile' : 'Show skeleton'}
        </Button>
      </div>
    </section>
  );
}