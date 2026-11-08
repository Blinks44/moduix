<script lang="ts">
  import {
    Collapsible,
    CollapsibleBody,
    CollapsibleContent,
    CollapsibleIndicator,
    CollapsibleTrigger,
  } from '@/components/collapsible';
</script>

<Collapsible class="w-1/2 text-primary" data-testid="collapsible-root">
  <CollapsibleTrigger class="gap-6 py-4 text-lg">
    Recovery details
    <CollapsibleIndicator class="size-5" />
  </CollapsibleTrigger>
  <CollapsibleContent class="text-lg">
    <CollapsibleBody class="gap-6 p-6">Keep this safe.</CollapsibleBody>
  </CollapsibleContent>
</Collapsible>