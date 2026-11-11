<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
  } from '@moduix/svelte/accordion';

  let value = $state<string[]>([]);
</script>

<Accordion bind:value>
  <AccordionItem value="first">
    <AccordionItemTrigger>What is moduix?</AccordionItemTrigger>
    <AccordionItemContent>A multi-framework component system.</AccordionItemContent>
  </AccordionItem>
</Accordion>