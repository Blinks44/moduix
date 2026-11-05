<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Bleed } from '@/components/bleed';
  import { Container } from '@/components/container';
  import { Text } from '@/components/text';
  import styles from './Container.stories.module.css';

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;
  const gutters = ['none', 'sm', 'md', 'lg'] as const;

  const { Story } = defineMeta({
    title: 'Components/Container',
    component: Container,
    parameters: { layout: 'fullscreen' },
  });
</script>

<Story name="Basic" asChild>
  <Container class={styles.container}>
    <Text weight="semibold">Responsive content column</Text>
    <Text tone="muted"
      >The declared size controls the readable content width. Gutters stay fluid near viewport
      edges.</Text
    >
  </Container>
</Story>

<Story name="Sizes" asChild>
  <div class={styles.stack}>
    {#each sizes as size (size)}<Container {size} class={styles.container}>
        <Text weight="semibold">size="{size}"</Text>
      </Container>{/each}
  </div>
</Story>

<Story name="Gutters" asChild>
  <div class={styles.stack}>
    {#each gutters as gutter (gutter)}<Container {gutter} class={styles.container}>
        <Text weight="semibold">gutter="{gutter}"</Text>
      </Container>{/each}
  </div>
</Story>

<Story name="Semantic Element" asChild>
  <Container size="md" class={styles.container}
    >{#snippet asChild(props)}<main {...props()}>
        <Text weight="semibold">Rendered as main</Text>
        <Text tone="muted">Use asChild when the layout wrapper also carries page semantics.</Text>
      </main>{/snippet}</Container
  >
</Story>

<Story name="With Bleed" asChild>
  <Container class={styles.container}>
    <Text weight="semibold">Constrained text column</Text>
    <Text tone="muted"
      >Use Bleed when media or dividers should extend beyond the readable width.</Text
    >
    <Bleed inline="md">
      <div class={styles.bleedSurface}>Bleed content escapes the container width.</div>
    </Bleed>
  </Container>
</Story>