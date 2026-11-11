<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Heading } from '@/components/heading';

  const stackClass = 'flex w-full max-w-lg flex-col gap-3';

  const { Story } = defineMeta({
    title: 'Components/Heading',
    component: Heading,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Default" asChild>
  <Heading>Build reliable interfaces</Heading>
</Story>

<Story name="Levels" asChild>
  <div class={stackClass}>
    <Heading>Heading level 1</Heading>
    <Heading as="h2">Heading level 2</Heading>
    <Heading as="h3">Heading level 3</Heading>
    <Heading as="h4">Heading level 4</Heading>
    <Heading as="h5">Heading level 5</Heading>
    <Heading as="h6">Heading level 6</Heading>
  </div>
</Story>

<Story name="Semantic Level" asChild>
  <Heading as="h2" size="2xl">Page title rendered as h2</Heading>
</Story>

<Story name="Custom Host" asChild>
  <Heading size="xl"
    >{#snippet asChild(props)}<h2 {...props()}>Factory-composed heading</h2>{/snippet}</Heading
  >
</Story>

<Story name="Visual Sizes" asChild>
  <div class={stackClass}>
    <Heading as="h2" size="2xl">Extra-large heading</Heading>
    <Heading as="h2" size="xl">Large heading</Heading>
    <Heading as="h2" size="lg">Medium-large heading</Heading>
    <Heading as="h2" size="md">Medium heading</Heading>
    <Heading as="h2" size="sm">Small heading</Heading>
    <Heading as="h2" size="xs">Extra-small heading</Heading>
  </div>
</Story>

<Story name="Weights" asChild>
  <div class={stackClass}>
    <Heading as="h2" weight="regular">Regular weight</Heading>
    <Heading as="h2" weight="medium">Medium weight</Heading>
    <Heading as="h2" weight="semibold">Semibold weight</Heading>
    <Heading as="h2" weight="bold">Bold weight</Heading>
  </div>
</Story>

<Story name="Custom Styles" asChild>
  <Heading as="h2" class="text-3xl font-bold text-primary">Customized heading</Heading>
</Story>