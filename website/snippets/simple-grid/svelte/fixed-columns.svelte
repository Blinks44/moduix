<script lang="ts">
  import { SimpleGrid } from '@moduix/svelte/simple-grid';
  import { Text } from '@moduix/svelte/text';
  import styles from '@/components/examples/simple-grid/simple-grid-fixed-columns.module.css';

  const metrics = [
    { label: 'Users', value: '24.8k' },
    { label: 'Sessions', value: '91k' },
    { label: 'Conversion', value: '8.4%' },
    { label: 'Revenue', value: '$42k' },
  ];
</script>

<SimpleGrid columns={4} gap="var(--moduix-spacing-3)" class={styles.root}>
  {#each metrics as metric (metric.label)}
    <div class={styles.metric}>
      <Text size="xl" weight="semibold">{metric.value}</Text>
      <Text tone="muted" size="sm">{metric.label}</Text>
    </div>
  {/each}
</SimpleGrid>