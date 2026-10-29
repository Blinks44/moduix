<script setup lang="ts">
import { ChevronDown as ChevronDownIcon } from '@lucide/vue';
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from '@moduix/vue/accordion';
import styles from '@/components/examples/accordion/accordion-build-from-parts.module.css';

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
  <Accordion :class="styles.root" :default-value="['what-is-ark-ui']">
    <AccordionItem v-for="item in items" :key="item.value" :value="item.value">
      <h3>
        <AccordionItemTrigger>
          {{ item.title }}
          <AccordionItemIndicator>
            <ChevronDownIcon :stroke-width="3" />
          </AccordionItemIndicator>
        </AccordionItemTrigger>
      </h3>
      <AccordionItemContent>
        <div :class="styles.body">{{ item.description }}</div>
      </AccordionItemContent>
    </AccordionItem>
  </Accordion>
</template>