<script lang="ts">
  import {
    AccordionItem,
    AccordionItemBody,
    AccordionItemContent,
    AccordionItemContext,
    AccordionItemTrigger,
    AccordionRootProvider,
    useAccordion,
  } from '@/components/accordion';
  import OpenSecondButton from './OpenSecondButton.svelte';

  const accordion = useAccordion({ defaultValue: ['first'] });
</script>

<AccordionRootProvider value={accordion}>
  <OpenSecondButton />
  <AccordionItem value="first">
    <AccordionItemTrigger>
      First item
      <AccordionItemContext>
        {#snippet render(item)}
          <span>First item is {item().expanded ? 'open' : 'closed'}</span>
        {/snippet}
      </AccordionItemContext>
    </AccordionItemTrigger>
    <AccordionItemContent><AccordionItemBody>First content</AccordionItemBody></AccordionItemContent
    >
  </AccordionItem>
  <AccordionItem value="second">
    <AccordionItemTrigger>Second item</AccordionItemTrigger>
    <AccordionItemContent
      ><AccordionItemBody>Second content</AccordionItemBody></AccordionItemContent
    >
  </AccordionItem>
</AccordionRootProvider>