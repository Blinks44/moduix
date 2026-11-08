<script lang="ts">
  import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/collapsible';
</script>

<Collapsible collapsedHeight="2rem">
  <CollapsibleTrigger>Partial details</CollapsibleTrigger>
  <CollapsibleContent data-testid="partial-content">
    <button type="button">Nested action</button>
  </CollapsibleContent>
</Collapsible>