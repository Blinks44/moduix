<script lang="ts">
  import { JsonTreeViewTree, type JsonTreeViewTreeProps } from '@ark-ui/svelte/json-tree-view';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronRightIcon } from '@/lib/moduix/icons/ui';

  let { arrow, class: className, ...props }: JsonTreeViewTreeProps = $props();
</script>

{#snippet defaultArrow()}
  <ChevronRightIcon aria-hidden="true" />
{/snippet}

<JsonTreeViewTree
  {...props}
  arrow={arrow ?? defaultArrow}
  class={cn('flex min-w-0 flex-col gap-1', className)}
  data-slot="json-tree-view-tree"
/>