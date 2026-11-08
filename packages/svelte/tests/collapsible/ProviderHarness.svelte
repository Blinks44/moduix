<script lang="ts">
  import {
    CollapsibleBody,
    CollapsibleContent,
    CollapsibleContext,
    CollapsibleRootProvider,
    CollapsibleTrigger,
    useCollapsible,
  } from '@/components/collapsible';

  const collapsible = useCollapsible({ id: 'provider-collapsible', defaultOpen: true });
</script>

<CollapsibleRootProvider value={collapsible}>
  <CollapsibleContext>
    {#snippet render(context)}
      <button type="button" onclick={() => context().setOpen(false)}>Close from context</button>
    {/snippet}
  </CollapsibleContext>
  <CollapsibleTrigger>Provider details</CollapsibleTrigger>
  <CollapsibleContent><CollapsibleBody>Provider content.</CollapsibleBody></CollapsibleContent>
</CollapsibleRootProvider>