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
    <AccordionItemContent>
      <AccordionItemBody class="p-0">First content</AccordionItemBody>
    </AccordionItemContent>
  </AccordionItem>
</Accordion>