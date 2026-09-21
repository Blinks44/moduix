<script setup lang="ts">
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from '@moduix/vue/accordion';

const items = [
  {
    value: 'what-is-ark-ui',
    title: 'What is Ark UI?',
    description: 'Ark UI is a headless component library for building accessible web interfaces.',
  },
  {
    value: 'getting-started',
    title: 'How do I get started?',
    description:
      'Install the package, import Accordion parts, and style the composition to match your product.',
  },
  {
    value: 'can-i-use-it',
    title: 'Can I use it for my project?',
    description: 'Yes. Ark UI is open source and designed for production design systems.',
  },
];
</script>

<template>
  <Accordion :class="$style.root" :default-value="['what-is-ark-ui', 'can-i-use-it']" multiple>
    <AccordionItem v-for="item in items" :key="item.value" :value="item.value">
      <AccordionItemTrigger>
        {{ item.title }}
        <AccordionItemIndicator />
      </AccordionItemTrigger>
      <AccordionItemContent>
        <AccordionItemBody>{{ item.description }}</AccordionItemBody>
      </AccordionItemContent>
    </AccordionItem>
  </Accordion>
</template>

<style module src="../../../src/components/examples/accordion/accordion-multiple.module.css" />