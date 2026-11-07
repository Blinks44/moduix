<script lang="ts">
  import {
    TreeViewNodeRenameInput,
    type TreeViewNodeRenameInputProps,
  } from '@ark-ui/svelte/tree-view';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: TreeViewNodeRenameInputProps = $props();

  const componentClass =
    'min-w-0 flex-1 rounded-xs border border-ring bg-background px-1 py-0 text-foreground outline-focus-inset outline-offset-focus-inset outline-transparent [font:inherit] focus-visible:outline-ring';
</script>

<TreeViewNodeRenameInput
  {...props}
  bind:ref
  class={cn(componentClass, className)}
  data-slot="tree-view-node-rename-input"
/>