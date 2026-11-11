<script lang="ts">
  import { Badge } from '@moduix/svelte/badge';
  import styles from '@/components/examples/badge/badge-sizes.module.css';

  const sizes = ['sm', 'md', 'lg'] as const;
</script>

<div class={styles.root}>
  {#each sizes as size (size)}
    <Badge {size}>{size}</Badge>
  {/each}
</div>