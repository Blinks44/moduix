<script setup lang="ts">
import { ref } from 'vue';
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from '../src/components/accordion';

const value = ref<string[]>(['first']);
</script>

<template>
  <Accordion v-model="value" collapsible>
    <AccordionItem value="first">
      <AccordionItemTrigger>
        First item
        <AccordionItemIndicator />
      </AccordionItemTrigger>
      <AccordionItemContent>
        <AccordionItemBody>First content</AccordionItemBody>
      </AccordionItemContent>
    </AccordionItem>
  </Accordion>
</template>