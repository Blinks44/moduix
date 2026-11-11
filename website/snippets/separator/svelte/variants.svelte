<script lang="ts">
  import { Separator } from '@moduix/svelte/separator';
  import styles from '@/components/examples/separator/separator-variants.module.css';

  const variants = ['solid', 'dashed', 'dotted'] as const;
</script>

<div class={styles.root}>
  {#each variants as variant (variant)}
    <div class={styles.item}>
      <span>{variant}</span>
      <Separator {variant} />
    </div>
  {/each}
</div>