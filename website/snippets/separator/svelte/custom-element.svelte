<script lang="ts">
  import { Separator } from '@moduix/svelte/separator';
  import styles from '@/components/examples/separator/separator-custom-element.module.css';

  const labels = ['Before native rule', 'After native rule'];
</script>

<div class={styles.root}>
  <span>{labels[0]}</span>
  <Separator>
    {#snippet asChild(props)}
      <hr {...props()} />
    {/snippet}
  </Separator>
  <span>{labels[1]}</span>
</div>