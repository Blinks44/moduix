<script lang="ts">
  import { TreeViewLabel, type TreeViewLabelProps } from '@ark-ui/svelte/tree-view';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TreeViewLabelProps = $props();
</script>

<TreeViewLabel
  {...props}
  bind:ref
  class={cn('text-sm font-medium select-none', className)}
  data-slot="tree-view-label"
/>