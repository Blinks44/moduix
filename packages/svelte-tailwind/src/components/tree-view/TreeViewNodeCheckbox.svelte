<script lang="ts">
  import { TreeViewNodeCheckbox, type TreeViewNodeCheckboxProps } from '@ark-ui/svelte/tree-view';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TreeViewNodeCheckboxProps = $props();

  const componentClass =
    'inline-flex size-4 shrink-0 items-center justify-center rounded-xs border border-input bg-background text-primary-foreground outline-focus-inset outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-normal ease-in-out focus-visible:outline-ring data-disabled:cursor-default data-disabled:opacity-disabled data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary [&_svg]:size-3 [:is([data-slot=tree-view-item],[data-slot=tree-view-branch-control])[data-disabled]_&]:opacity-100';
</script>

<TreeViewNodeCheckbox
  {...props}
  bind:ref
  class={cn(componentClass, className)}
  data-slot="tree-view-node-checkbox"
/>