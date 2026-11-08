<script lang="ts">
  import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/collapsible';

  let triggerRef: Element | null = $state(null);

  export const getRefs = () => ({ triggerRef });
</script>

<Collapsible>
  <CollapsibleTrigger bind:ref={triggerRef}>
    {#snippet asChild(props)}
      <button {...props({ class: 'consumer-trigger' })} type="button">Composed details</button>
    {/snippet}
  </CollapsibleTrigger>
  <CollapsibleContent>Composed content.</CollapsibleContent>
</Collapsible>