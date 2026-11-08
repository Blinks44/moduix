<script lang="ts">
  import { Container } from '@moduix/svelte/container';
  import styles from '@/components/examples/container/container-full-width.module.css';
</script>

<Container size="full" gutter="lg" class={styles.root}>
  <h3>Full-width section</h3>
  <p>
    The content can use all available width while the selected gutter protects it from viewport
    edges.
  </p>
</Container>