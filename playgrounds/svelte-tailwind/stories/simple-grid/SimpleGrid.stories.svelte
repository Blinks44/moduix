<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { SimpleGrid } from '@/components/simple-grid';

  const gridClass = 'w-[min(48rem,calc(100vw-4rem))]';
  const itemClass = 'min-w-0 rounded-lg border border-border bg-background p-4';
  const titleClass =
    'm-0 text-md leading-6 font-semibold tracking-normal wrap-anywhere text-foreground';
  const mutedClass =
    'm-0 text-md leading-6 font-regular tracking-normal wrap-anywhere text-muted-foreground';

  const items = ['Analytics', 'Billing', 'Customers', 'Exports', 'Integrations', 'Reports'];

  const { Story } = defineMeta({
    title: 'Components/SimpleGrid',
    component: SimpleGrid,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Columns" asChild>
  <SimpleGrid columns={3} gap={12} class={gridClass}>
    {#each items as item (item)}<div class={itemClass}>
        <p class={titleClass}>{item}</p>
      </div>{/each}
  </SimpleGrid>
</Story>

<Story name="Auto Responsive" asChild>
  <SimpleGrid minChildWidth={160} gap={12} class={gridClass}>
    {#each items as item (item)}<div class={itemClass}>
        <p class={titleClass}>{item}</p>
        <p class={mutedClass}>The column count follows the available width.</p>
      </div>{/each}
  </SimpleGrid>
</Story>

<Story name="Separate Gaps" asChild>
  <SimpleGrid columns={3} rowGap={24} columnGap={8} class={gridClass}>
    {#each items as item (item)}<div class={itemClass}>
        <p class={titleClass}>{item}</p>
      </div>{/each}
  </SimpleGrid>
</Story>

<Story name="Semantic Element" asChild>
  <SimpleGrid minChildWidth="10rem" gap={12} class={gridClass}
    >{#snippet asChild(props)}<section {...props()} aria-label="Workspace sections">
        {#each items as item (item)}<div class={itemClass}>
            <p class={titleClass}>{item}</p>
          </div>{/each}
      </section>{/snippet}</SimpleGrid
  >
</Story>