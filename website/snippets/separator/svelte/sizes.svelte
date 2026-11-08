<script lang="ts">
  import { Separator } from '@moduix/svelte/separator';
  import styles from '@/components/examples/separator/separator-sizes.module.css';

  const sizes = ['xs', 'sm', 'md', 'lg'] as const;
</script>

<div class={styles.root}>
  {#each sizes as size (size)}
    <div class={styles.item}>
      <span>{size}</span>
      <Separator {size} />
    </div>
  {/each}
</div>