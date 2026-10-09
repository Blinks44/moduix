<script setup lang="ts">
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from '@moduix/vue/accordion';
import { ref } from 'vue';

const value = ref<string[]>([]);
</script>

<template>
  <Accordion v-model="value">
    <AccordionItem value="first">
      <AccordionItemTrigger>What is moduix?</AccordionItemTrigger>
      <AccordionItemContent>A multi-framework component system.</AccordionItemContent>
    </AccordionItem>
  </Accordion>
</template>