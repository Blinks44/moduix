<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    AccordionItemBody,
    AccordionItemContent,
    AccordionItemTrigger,
  } from '@/components/accordion';
</script>

<Accordion defaultValue={['first']}>
  <AccordionItem value="first">
    <AccordionItemTrigger>First item</AccordionItemTrigger>
    <AccordionItemContent><AccordionItemBody>First content</AccordionItemBody></AccordionItemContent
    >
  </AccordionItem>
  <AccordionItem value="second">
    <AccordionItemTrigger>Second item</AccordionItemTrigger>
    <AccordionItemContent
      ><AccordionItemBody>Second content</AccordionItemBody></AccordionItemContent
    >
  </AccordionItem>
</Accordion>