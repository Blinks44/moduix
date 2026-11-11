<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    AccordionItemBody,
    AccordionItemContent,
    AccordionItemIndicator,
    AccordionItemTrigger,
  } from '@/components/accordion';

  let rootRef: Element | null = $state(null);
  let triggerRef: Element | null = $state(null);
  let bodyRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, triggerRef, bodyRef });
</script>

<Accordion bind:ref={rootRef} defaultValue={['first']} data-probe="root">
  <AccordionItem value="first">
    <AccordionItemTrigger bind:ref={triggerRef}>
      First item
      <AccordionItemIndicator />
    </AccordionItemTrigger>
    <AccordionItemContent>
      <AccordionItemBody bind:ref={bodyRef}>First content</AccordionItemBody>
    </AccordionItemContent>
  </AccordionItem>
</Accordion>