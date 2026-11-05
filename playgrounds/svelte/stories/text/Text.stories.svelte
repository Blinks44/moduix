<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Text } from '@/components/text';
  import styles from './Text.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/Text',
    component: Text,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <Text>Use text to describe interface state, content, and supporting details.</Text>
</Story>

<Story name="Semantics" asChild>
  <div class={styles.stack}>
    <Text>Paragraph text rendered as p.</Text>
    <Text as="span">Inline text rendered as span.</Text>
    <Text as="small" tone="muted">Small supporting text rendered as small.</Text>
    <Text as="strong">Important text rendered as strong.</Text>
    <Text as="em">Emphasized text rendered as em.</Text>
    <Text as="div">Block text rendered as div.</Text>
  </div>
</Story>

<Story name="Custom Element" asChild>
  <Text tone="primary" weight="medium"
    >{#snippet asChild(props)}<a {...props()} href="#docs"
        >Text rendered through a custom link element.</a
      >{/snippet}</Text
  >
</Story>

<Story name="Sizes" asChild>
  <div class={styles.stack}>
    <Text size="xl">Extra-large text</Text>
    <Text size="lg">Large text</Text>
    <Text size="md">Medium text</Text>
    <Text size="sm">Small text</Text>
    <Text size="xs">Extra-small text</Text>
  </div>
</Story>

<Story name="Tones" asChild>
  <div class={styles.stack}>
    <Text tone="default">Default tone</Text>
    <Text tone="muted">Muted tone</Text>
    <Text tone="primary">Primary tone</Text>
    <Text tone="destructive">Destructive tone</Text>
  </div>
</Story>

<Story name="Weights" asChild>
  <div class={styles.stack}>
    <Text weight="regular">Regular weight</Text>
    <Text weight="medium">Medium weight</Text>
    <Text weight="semibold">Semibold weight</Text>
    <Text weight="bold">Bold weight</Text>
  </div>
</Story>

<Story name="Aligned" asChild>
  <div class={styles.aligned}>
    <Text align="start">Start-aligned text.</Text>
    <Text align="center">Center aligned text.</Text>
    <Text align="end">End-aligned text.</Text>
  </div>
</Story>

<Story name="Truncation" asChild>
  <div class={styles.narrow}>
    <Text truncate>Release notes for the weekly platform update are ready for review.</Text>
    <Text lineClamp={2}>
      Longer interface copy can be clamped when it appears inside dense cards, tables, or
      constrained previews where the surrounding layout owns disclosure.
    </Text>
  </div>
</Story>