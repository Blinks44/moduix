<script lang="ts">
  import {
    Collapsible,
    CollapsibleBody,
    CollapsibleContent,
    CollapsibleIndicator,
    CollapsibleTrigger,
  } from '@/components/collapsible';

  let rootRef: Element | null = $state(null);
  let triggerRef: Element | null = $state(null);
  let indicatorRef: Element | null = $state(null);
  let contentRef: Element | null = $state(null);
  let bodyRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, triggerRef, indicatorRef, contentRef, bodyRef });
</script>

<Collapsible bind:ref={rootRef} defaultOpen data-probe="root">
  <CollapsibleTrigger bind:ref={triggerRef}>
    Details
    <CollapsibleIndicator bind:ref={indicatorRef} />
  </CollapsibleTrigger>
  <CollapsibleContent bind:ref={contentRef}>
    <CollapsibleBody bind:ref={bodyRef}>Content</CollapsibleBody>
  </CollapsibleContent>
</Collapsible>