<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    AccordionItemBody,
    AccordionItemContent,
    AccordionItemIndicator,
    AccordionItemTrigger,
  } from '@moduix/svelte/accordion';
</script>

<Accordion defaultValue={['first']}>
  <AccordionItem value="first">
    <AccordionItemTrigger>
      What is moduix?
      <AccordionItemIndicator />
    </AccordionItemTrigger>
    <AccordionItemContent>
      <AccordionItemBody
        >A component library built on accessible Ark UI primitives.</AccordionItemBody
      >
    </AccordionItemContent>
  </AccordionItem>
</Accordion>