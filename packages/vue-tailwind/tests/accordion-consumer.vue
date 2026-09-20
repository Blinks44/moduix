<script setup lang="ts">
import { ref } from 'vue';
import { Accordion } from '../src/components/accordion';

const value = ref<string[]>(['first']);
</script>

<template>
  <Accordion v-model="value" collapsible>
    <Accordion.Item value="first">
      <Accordion.ItemTrigger>
        First item
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody class="p-0">First content</Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  </Accordion>
</template>