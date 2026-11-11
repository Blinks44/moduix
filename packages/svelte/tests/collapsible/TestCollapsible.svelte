<script lang="ts">
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    type CollapsibleRootProps,
  } from '@/components/collapsible';

  let { open = $bindable(), ...props }: CollapsibleRootProps = $props();
</script>

<Collapsible {...props} bind:open>
  <CollapsibleTrigger>Recovery details</CollapsibleTrigger>
  <CollapsibleContent>Keep this safe.</CollapsibleContent>
</Collapsible>