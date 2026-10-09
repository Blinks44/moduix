<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/vue/tags-input';
import { ref } from 'vue';
import styles from '@/components/examples/tags-input/tags-input-controlled-input-value.module.css';

const inputValue = ref('');
</script>

<template>
  <Stack :class="styles.root">
    <TagsInput v-model:input-value="inputValue" :default-value="['Vue']">
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
    </TagsInput>
    <output>Input: {{ inputValue || 'empty' }}</output>
    <Button type="button" size="sm" @click="inputValue = 'React'">Set React</Button>
  </Stack>
</template>