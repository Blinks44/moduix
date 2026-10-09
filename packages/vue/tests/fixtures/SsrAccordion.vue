<script setup lang="ts">
import {
  Accordion,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
  AccordionItemBody,
} from '../../src/components/accordion';
</script>

<template>
  <Accordion :default-value="['first']">
    <AccordionItem value="first"
      ><AccordionItemTrigger>First item</AccordionItemTrigger
      ><AccordionItemContent
        ><AccordionItemBody>First content</AccordionItemBody></AccordionItemContent
      ></AccordionItem
    >
    <AccordionItem value="second"
      ><AccordionItemTrigger>Second item</AccordionItemTrigger
      ><AccordionItemContent
        ><AccordionItemBody>Second content</AccordionItemBody></AccordionItemContent
      ></AccordionItem
    >
  </Accordion>
</template>