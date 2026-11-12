<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/vue/radio-group';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';

const frameworks = ['React', 'Solid', 'Vue'];
const value = ref<string | null>(null);
</script>

<template>
  <Stack align="center" gap="2">
    <RadioGroup v-model="value">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioGroupOption v-for="framework in frameworks" :key="framework" :value="framework">
        {{ framework }}
      </RadioGroupOption>
    </RadioGroup>
    <div data-preview-meta>
      <output>Selected: {{ value ?? 'none' }}</output>
    </div>
  </Stack>
</template>