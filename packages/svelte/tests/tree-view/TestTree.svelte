<script lang="ts">
  import { TreeView, type TreeViewRootProps } from '@/components/tree-view';
  import { collection as fileCollection, type FileNode } from './files';
  import TreeParts from './TreeParts.svelte';

  let { collection = fileCollection, ...props }: TreeViewRootProps<FileNode> = $props();

  let root: Element | null = $state(null);

  export const getRoot = () => root;
</script>

<TreeView {...props} bind:ref={root} {collection}>
  <TreeParts {collection} />
</TreeView>