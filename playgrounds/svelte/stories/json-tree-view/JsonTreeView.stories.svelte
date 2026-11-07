<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { JsonTreeView, JsonTreeViewTree } from '@/components/json-tree-view';

  const release = {
    build: {
      branch: 'main',
      commit: '0f4c9d7',
      status: 'ready',
    },
    package: {
      dependencies: ['@ark-ui/svelte', '@moduix/svelte'],
      name: '@moduix/svelte',
      version: '2.3.0',
    },
  };

  const compactPreviews = {
    environment: 'production',
    releaseNotes:
      'This release makes long JSON values easier to inspect without expanding every property first.',
    reviewers: ['Avery', 'Jordan', 'Morgan', 'Sam', 'Taylor'],
  };

  const { Story } = defineMeta({
    title: 'Utilities/JsonTreeView',
    component: JsonTreeView,
  });
</script>

<Story name="Basic" asChild>
  <JsonTreeView data={release} defaultExpandedDepth={2}>
    <JsonTreeViewTree />
  </JsonTreeView>
</Story>

<Story name="Compact Previews" exportName="CompactPreviews" asChild>
  <JsonTreeView
    collapseStringsAfterLength={28}
    data={compactPreviews}
    defaultExpandedDepth={1}
    maxPreviewItems={3}
  >
    <JsonTreeViewTree />
  </JsonTreeView>
</Story>