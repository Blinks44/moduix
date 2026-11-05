<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { SimpleGrid } from '@/components/simple-grid';
  import { Text } from '@/components/text';
  import styles from './SimpleGrid.stories.module.css';

  const items = ['Analytics', 'Billing', 'Customers', 'Exports', 'Integrations', 'Reports'];

  const { Story } = defineMeta({
    title: 'Components/SimpleGrid',
    component: SimpleGrid,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Columns" asChild>
  <SimpleGrid columns={3} gap={12} class={styles.grid}>
    {#each items as item (item)}<div class={styles.item}>
        <Text weight="semibold">{item}</Text>
      </div>{/each}
  </SimpleGrid>
</Story>

<Story name="Auto Responsive" asChild>
  <SimpleGrid minChildWidth={160} gap={12} class={styles.grid}>
    {#each items as item (item)}<div class={styles.item}>
        <Text weight="semibold">{item}</Text>
        <Text tone="muted">The column count follows the available width.</Text>
      </div>{/each}
  </SimpleGrid>
</Story>

<Story name="Separate Gaps" asChild>
  <SimpleGrid columns={3} rowGap={24} columnGap={8} class={styles.grid}>
    {#each items as item (item)}<div class={styles.item}>
        <Text weight="semibold">{item}</Text>
      </div>{/each}
  </SimpleGrid>
</Story>

<Story name="Semantic Element" asChild>
  <SimpleGrid minChildWidth="10rem" gap={12} class={styles.grid}
    >{#snippet asChild(props)}<section {...props()} aria-label="Workspace sections">
        {#each items as item (item)}<div class={styles.item}>
            <Text weight="semibold">{item}</Text>
          </div>{/each}
      </section>{/snippet}</SimpleGrid
  >
</Story>