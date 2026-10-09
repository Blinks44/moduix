<script setup lang="ts">
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from '@moduix/vue/accordion';
import styles from '@/components/examples/styling/project-checklist.module.css';
</script>
<template>
  <section :class="styles.root">
    <Accordion :class="styles.accordion" collapsible :default-value="['outcome']">
      <AccordionItem :class="styles.item" value="outcome">
        <AccordionItemTrigger :class="styles.trigger">
          <span :class="styles.triggerCopy"
            ><span :class="styles.step">01</span
            ><span :class="styles.title">Define the project outcome</span></span
          >
          <AccordionItemIndicator :class="styles.indicator" />
        </AccordionItemTrigger>
        <AccordionItemContent :class="styles.content">
          <AccordionItemBody :class="styles.body"
            ><p>
              Write one sentence that makes the next decision obvious to everyone on the project.
            </p></AccordionItemBody
          >
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  </section>
</template>