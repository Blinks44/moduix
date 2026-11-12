<script lang="ts">
  import { Container } from '@moduix/svelte/container';
  import { Heading } from '@moduix/svelte/heading';
  import { Text } from '@moduix/svelte/text';
  import styles from '@/components/examples/container/container-full-width.module.css';
</script>

<Container size="full" gutter="lg" class={styles.root}>
  <Heading as="h3" size="lg">Full-width section</Heading>
  <Text tone="muted"
    >The content can use all available width while the selected gutter protects it from viewport
    edges.</Text
  >
</Container>