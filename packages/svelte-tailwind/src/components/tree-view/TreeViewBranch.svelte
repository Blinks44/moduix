<script lang="ts">
  import { TreeViewBranch, type TreeViewBranchProps } from '@ark-ui/svelte/tree-view';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TreeViewBranchProps = $props();
</script>

<TreeViewBranch
  {...props}
  bind:ref
  class={cn('flex min-w-0 flex-col gap-1', className)}
  data-slot="tree-view-branch"
/>