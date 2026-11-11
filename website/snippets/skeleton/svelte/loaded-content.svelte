<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Skeleton } from '@moduix/svelte/skeleton';
  import styles from '@/components/examples/skeleton/skeleton-loaded-content.module.css';

  const profile = { name: 'Ada Lovelace', role: 'Analytical engine notes' };
  let loading = $state(true);
</script>

<section aria-label="Profile" aria-busy={loading} class={styles.root}>
  <Skeleton {loading} class={styles.skeleton}>
    <strong>{profile.name}</strong>
    <span class={styles.role}>{profile.role}</span>
  </Skeleton>
  <div>
    <output>Profile: {loading ? 'loading' : 'loaded'}</output>
    <Button size="sm" type="button" onclick={() => (loading = !loading)}>
      {loading ? 'Show profile' : 'Show skeleton'}
    </Button>
  </div>
</section>