<script lang="ts">
  import { TreeViewBranchText, type TreeViewBranchTextProps } from '@ark-ui/svelte/tree-view';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TreeViewBranchTextProps = $props();

  const componentClass =
    'min-w-0 flex-1 truncate [&_svg]:my-[calc((1lh-var(--moduix-spacing-4))/2)] [&_svg]:me-2 [&_svg]:inline-block [&_svg]:size-4 [&_svg]:align-top';
</script>

<TreeViewBranchText
  {...props}
  bind:ref
  class={cn(componentClass, className)}
  data-slot="tree-view-branch-text"
/>