<script lang="ts">
  import { Container } from '@moduix/svelte/container';
  import styles from '@/components/examples/container/container-semantic-element.module.css';
</script>

<Container size="md" class={styles.root}>
  {#snippet asChild(props)}
    <main {...props()}>
      <h3>Main content area</h3>
      <p>Use asChild when the wrapper should carry semantic meaning.</p>
    </main>
  {/snippet}
</Container>