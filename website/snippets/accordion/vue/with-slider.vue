<script setup lang="ts">
import {
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@ark-ui/vue/slider';
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from '@moduix/vue/accordion';
import styles from '@/components/examples/accordion/accordion-with-slider.module.css';

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
      <AccordionItemTrigger>
        {{ item.title }}
        <AccordionItemIndicator />
      </AccordionItemTrigger>
      <AccordionItemContent>
        <AccordionItemBody>
          <span>{{ item.description }}</span>
          <SliderRoot :class="styles.sliderRoot" :default-value="[40]">
            <SliderLabel :class="styles.sliderLabel">{{ item.title }} priority</SliderLabel>
            <SliderControl :class="styles.sliderControl">
              <SliderTrack :class="styles.sliderTrack">
                <SliderRange :class="styles.sliderRange" />
              </SliderTrack>
              <SliderThumb :class="styles.sliderThumb" :index="0">
                <SliderHiddenInput />
              </SliderThumb>
            </SliderControl>
          </SliderRoot>
        </AccordionItemBody>
      </AccordionItemContent>
    </AccordionItem>
  </Accordion>
</template>