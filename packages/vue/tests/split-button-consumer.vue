<script setup lang="ts">
import { ref } from 'vue';
import { MenuItem } from '../src/components/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '../src/components/split-button';

const open = ref(false);
const selected = ref('');
</script>

<template>
  <SplitButton
    v-model:open="open"
    aria-label="Save actions"
    size="lg"
    variant="outline"
    :portalled="false"
    :positioning="{ placement: 'bottom-start', gutter: 8 }"
    @select="selected = $event.value"
  >
    <SplitButtonAction as-child size="sm"><a href="#docs">Docs</a></SplitButtonAction>
    <SplitButtonTrigger disabled :class="['consumer', { active: open }]"
      >Options</SplitButtonTrigger
    >
    <SplitButtonPositioner>
      <SplitButtonContent as-child
        ><section><MenuItem value="save">Save</MenuItem></section></SplitButtonContent
      >
    </SplitButtonPositioner>
  </SplitButton>
  <output>{{ selected }}</output>
</template>