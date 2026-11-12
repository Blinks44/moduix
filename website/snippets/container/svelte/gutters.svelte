<script lang="ts">
  import { Container } from '@moduix/svelte/container';
  import { Text } from '@moduix/svelte/text';
  import styles from '@/components/examples/container/container-gutters.module.css';

  const gutters = [
    { value: 'none', label: 'No gutter' },
    { value: 'sm', label: 'Small gutter' },
    { value: 'md', label: 'Medium gutter' },
    { value: 'lg', label: 'Large gutter' },
  ] as const;
</script>

<div class={styles.stack}>
  {#each gutters as gutter (gutter.value)}
    <Container gutter={gutter.value} class={styles.container}>
      <Text>{gutter.label}</Text>
    </Container>
  {/each}
</div>