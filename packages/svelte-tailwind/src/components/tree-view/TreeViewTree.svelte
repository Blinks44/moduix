<script lang="ts">
  import { TreeViewTree, type TreeViewTreeProps } from '@ark-ui/svelte/tree-view';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TreeViewTreeProps = $props();
</script>

<TreeViewTree
  {...props}
  bind:ref
  class={cn('flex min-w-0 flex-col gap-1 text-sm', className)}
  data-slot="tree-view-tree"
/>