<script lang="ts">
  import { JsonTreeViewRoot, type JsonTreeViewRootProps } from '@ark-ui/svelte/json-tree-view';
  import { cn } from '@/lib/moduix/cn';
  import { jsonTreeViewRootClass } from './JsonTreeView.variants';

  let {
    checkedValue = $bindable(),
    class: className,
    expandedValue = $bindable(),
    focusedValue = $bindable(),
    selectedValue = $bindable(),
    ...props
  }: JsonTreeViewRootProps = $props();
</script>

<JsonTreeViewRoot
  {...props}
  bind:expandedValue
  bind:selectedValue
  bind:focusedValue
  bind:checkedValue
  class={cn(jsonTreeViewRootClass, className)}
  data-slot="json-tree-view-root"
/>