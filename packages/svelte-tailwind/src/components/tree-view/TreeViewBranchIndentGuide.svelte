<script lang="ts">
  import {
    TreeViewBranchIndentGuide,
    type TreeViewBranchIndentGuideProps,
  } from '@ark-ui/svelte/tree-view';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: TreeViewBranchIndentGuideProps = $props();

  const componentClass =
    'pointer-events-none absolute inset-y-0 start-[calc(var(--depth)*var(--moduix-spacing-4))] z-1 w-px bg-border';
</script>

<TreeViewBranchIndentGuide
  {...props}
  bind:ref
  class={cn(componentClass, className)}
  data-slot="tree-view-branch-indent-guide"
/>