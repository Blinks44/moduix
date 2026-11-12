<script lang="ts">
  import { Text } from '@moduix/svelte/text';
  import styles from '@/components/examples/text/text-alignment.module.css';
</script>

<div class={styles.stack}>
  <Text align="start">Start-aligned text.</Text>
  <Text align="center">Center aligned text.</Text>
  <Text align="end">End-aligned text.</Text>
</div>