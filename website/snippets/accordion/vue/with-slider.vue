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
  <Accordion :class="$style.root" :default-value="['what-is-ark-ui']">
    <AccordionItem v-for="item in items" :key="item.value" :value="item.value">
      <AccordionItemTrigger>
        {{ item.title }}
        <AccordionItemIndicator />
      </AccordionItemTrigger>
      <AccordionItemContent>
        <AccordionItemBody>
          <span>{{ item.description }}</span>
          <SliderRoot :class="$style.sliderRoot" :default-value="[40]">
            <SliderLabel :class="$style.sliderLabel">{{ item.title }} priority</SliderLabel>
            <SliderControl :class="$style.sliderControl">
              <SliderTrack :class="$style.sliderTrack">
                <SliderRange :class="$style.sliderRange" />
              </SliderTrack>
              <SliderThumb :class="$style.sliderThumb" :index="0">
                <SliderHiddenInput />
              </SliderThumb>
            </SliderControl>
          </SliderRoot>
        </AccordionItemBody>
      </AccordionItemContent>
    </AccordionItem>
  </Accordion>
</template>

<style module src="../../../src/components/examples/accordion/accordion-with-slider.module.css" />