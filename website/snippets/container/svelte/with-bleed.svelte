<script lang="ts">
  import { Bleed } from '@moduix/svelte/bleed';
  import { Container } from '@moduix/svelte/container';
  import { Heading } from '@moduix/svelte/heading';
  import { Text } from '@moduix/svelte/text';
  import styles from '@/components/examples/container/container-with-bleed.module.css';
</script>

<Container class={styles.root}>
  <Heading as="h3" size="lg">Article body</Heading>
  <Text tone="muted"
    >Keep the reading width constrained, then use Bleed for content that should stretch wider.</Text
  >
  <Bleed inline="md">
    <div class={styles.bleedSurface}>Bleed content escapes the constrained column.</div>
  </Bleed>
</Container>