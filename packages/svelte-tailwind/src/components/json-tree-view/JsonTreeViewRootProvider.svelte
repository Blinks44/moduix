<script lang="ts">
  import {
    JsonTreeViewRootProvider,
    type JsonTreeViewRootProviderProps,
  } from '@ark-ui/svelte/json-tree-view';
  import { cn } from '@/lib/moduix/cn';
  import { jsonTreeViewRootClass } from './JsonTreeView.variants';

  let { class: className, ...props }: JsonTreeViewRootProviderProps = $props();
</script>

<JsonTreeViewRootProvider
  {...props}
  class={cn(jsonTreeViewRootClass, className)}
  data-slot="json-tree-view-root-provider"
/>