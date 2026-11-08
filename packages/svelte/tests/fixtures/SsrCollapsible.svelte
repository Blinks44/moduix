<script lang="ts">
  import {
    Collapsible,
    CollapsibleBody,
    CollapsibleContent,
    CollapsibleTrigger,
  } from '@/components/collapsible';
</script>

<Collapsible defaultOpen>
  <CollapsibleTrigger>Server details</CollapsibleTrigger>
  <CollapsibleContent><CollapsibleBody>Server content.</CollapsibleBody></CollapsibleContent>
</Collapsible>