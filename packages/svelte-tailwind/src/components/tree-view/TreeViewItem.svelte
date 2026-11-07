<script lang="ts">
  import { TreeViewItem, type TreeViewItemProps } from '@ark-ui/svelte/tree-view';
  import { cn } from '@/lib/moduix/cn';
  import { treeViewRowVariants } from './TreeView.variants';

  let { class: className, ref = $bindable(null), ...props }: TreeViewItemProps = $props();

  const componentClass = 'ps-[calc(var(--_tree-view-indent)+var(--moduix-spacing-4))]';
</script>

<TreeViewItem
  {...props}
  bind:ref
  class={cn(treeViewRowVariants(), componentClass, className)}
  data-slot="tree-view-item"
/>