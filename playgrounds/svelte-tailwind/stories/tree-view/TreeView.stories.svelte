<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { contentStressCollection, disabledCollection } from './files';
  import TreeViewDemo from './TreeViewDemo.svelte';

  const { Story } = defineMeta({
    title: 'Components/TreeView',
  });
</script>

<Story name="Basic" asChild>
  <TreeViewDemo />
</Story>

<Story name="Content Stress" exportName="ContentStress" asChild>
  <TreeViewDemo collection={contentStressCollection} />
</Story>

<Story name="Disabled" asChild>
  <TreeViewDemo collection={disabledCollection} />
</Story>