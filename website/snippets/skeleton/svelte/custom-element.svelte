<script lang="ts">
  import { Skeleton } from '@moduix/svelte/skeleton';
  import styles from '@/components/examples/skeleton/skeleton-custom-element.module.css';

  const loadingRegion = { label: 'Loading summary' };
</script>

<Skeleton class={styles.root} height={72} borderRadius="var(--moduix-radius-lg)">
  {#snippet asChild(props)}
    <section {...props()} aria-label={loadingRegion.label}></section>
  {/snippet}
</Skeleton>