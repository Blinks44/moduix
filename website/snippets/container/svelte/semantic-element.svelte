<script lang="ts">
  import { Container } from '@moduix/svelte/container';
  import { Heading } from '@moduix/svelte/heading';
  import { Text } from '@moduix/svelte/text';
  import styles from '@/components/examples/container/container-semantic-element.module.css';
</script>

<Container size="md" class={styles.root}>
  {#snippet asChild(props)}
    <main {...props()}>
      <Heading as="h3" size="lg">Main content area</Heading>
      <Text tone="muted">Use asChild when the wrapper should carry semantic meaning.</Text>
    </main>
  {/snippet}
</Container>