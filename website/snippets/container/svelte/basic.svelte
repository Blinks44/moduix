<script lang="ts">
  import { Container } from '@moduix/svelte/container';
  import { Heading } from '@moduix/svelte/heading';
  import { Text } from '@moduix/svelte/text';
  import styles from '@/components/examples/container/container-basic.module.css';
</script>

<Container class={styles.root}>
  <Heading as="h3" size="lg">Responsive page content</Heading>
  <Text tone="muted">The content column stays readable while inline gutters fluidly adapt.</Text>
</Container>