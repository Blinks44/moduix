<script lang="ts">
  import { Badge } from '@moduix/svelte/badge';
  import styles from '@/components/examples/badge/badge-variants.module.css';

  const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const;
</script>

<div class={styles.root}>
  {#each variants as variant (variant)}
    <Badge {variant}>
      {variant}
    </Badge>
  {/each}
</div>