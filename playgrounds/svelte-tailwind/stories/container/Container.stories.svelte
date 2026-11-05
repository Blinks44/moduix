<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Bleed } from '@/components/bleed';
  import { Container } from '@/components/container';

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;
  const gutters = ['none', 'sm', 'md', 'lg'] as const;
  const containerClass =
    'border-y border-dashed border-border bg-muted [background-image:linear-gradient(90deg,rgb(0_0_0_/_0.05)_0_1px,transparent_1px)] [background-position:0_0] [background-size:4rem_100%] py-4';
  const stackClass = 'flex w-full flex-col gap-4 py-4';
  const contentClass = 'max-w-[42rem]';

  const { Story } = defineMeta({
    title: 'Components/Container',
    component: Container,
    parameters: { layout: 'fullscreen' },
  });
</script>

<Story name="Basic" asChild>
  <Container class={containerClass}>
    <p class={[contentClass, 'font-semibold']}>Responsive content column</p>
    <p class={[contentClass, 'text-muted-foreground']}>
      The declared size controls the readable content width. Gutters stay fluid near viewport edges.
    </p>
  </Container>
</Story>

<Story name="Sizes" asChild>
  <div class={stackClass}>
    {#each sizes as size (size)}<Container {size} class={containerClass}>
        <p class={[contentClass, 'font-semibold']}>size="{size}"</p>
      </Container>{/each}
  </div>
</Story>

<Story name="Gutters" asChild>
  <div class={stackClass}>
    {#each gutters as gutter (gutter)}<Container {gutter} class={containerClass}>
        <p class={[contentClass, 'font-semibold']}>gutter="{gutter}"</p>
      </Container>{/each}
  </div>
</Story>

<Story name="Semantic Element" asChild>
  <Container size="md" class={containerClass}
    >{#snippet asChild(props)}<main {...props()}>
        <p class={[contentClass, 'font-semibold']}>Rendered as main</p>
        <p class={[contentClass, 'text-muted-foreground']}>
          Use asChild when the layout wrapper also carries page semantics.
        </p>
      </main>{/snippet}</Container
  >
</Story>

<Story name="With Bleed" asChild>
  <Container class={containerClass}>
    <p class={[contentClass, 'font-semibold']}>Constrained text column</p>
    <p class={[contentClass, 'text-muted-foreground']}>
      Use Bleed when media or dividers should extend beyond the readable width.
    </p>
    <Bleed inline="md" class={contentClass}>
      <div class="border border-border bg-background p-4">
        Bleed content escapes the container width.
      </div>
    </Bleed>
  </Container>
</Story>