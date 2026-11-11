<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Highlight } from '@/components/highlight';
  import { Text } from '@/components/text';
  import styles from './Highlight.stories.module.css';
  import HighlightDynamicQuery from './HighlightDynamicQuery.svelte';

  const { Story } = defineMeta({
    title: 'Utilities/Highlight',
    component: Highlight,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <Text>
    <Highlight
      query="component"
      text="Ark UI is a headless component library for building accessible web applications."
    />
  </Text>
</Story>

<Story name="Dynamic Query" asChild>
  <HighlightDynamicQuery />
</Story>

<Story name="Multiple Queries" asChild>
  <Text>
    <Highlight
      query={['React', 'Vue']}
      text="Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
    />
  </Text>
</Story>

<Story name="Ignore Case" asChild>
  <Text>
    <Highlight
      ignoreCase
      query="typescript"
      text="TypeScript provides static type checking. Using typescript helps catch errors early in development."
    />
  </Text>
</Story>

<Story name="Match All" asChild>
  <div class={styles.comparison}>
    <div>
      <div class={styles.label}>Match all</div>
      <Text>
        <Highlight
          matchAll
          query="component"
          text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
        />
      </Text>
    </div>
    <div>
      <div class={styles.label}>First match only</div>
      <Text>
        <Highlight
          matchAll={false}
          query="component"
          text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
        />
      </Text>
    </div>
  </div>
</Story>

<Story name="Exact Match" asChild>
  <div class={styles.comparison}>
    <div>
      <div class={styles.label}>Partial match</div>
      <Text>
        <Highlight
          matchAll
          query="box"
          text="The checkbox component renders a box element. Use combobox for autocomplete."
        />
      </Text>
    </div>
    <div>
      <div class={styles.label}>Exact match</div>
      <Text>
        <Highlight
          exactMatch
          matchAll
          query="box"
          text="The checkbox component renders a box element. Use combobox for autocomplete."
        />
      </Text>
    </div>
  </div>
</Story>

<Story name="Custom Styling" asChild>
  <Text>
    <Highlight
      class={styles.custom}
      query="moduix"
      text="moduix keeps highlight styling aligned with the rest of the component library."
    />
  </Text>
</Story>