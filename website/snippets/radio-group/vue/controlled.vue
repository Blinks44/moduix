<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/vue/radio-group';
import { ref } from 'vue';
import styles from '@/components/examples/radio-group/radio-group-controlled.module.css';

const frameworks = ['React', 'Solid', 'Vue'];
const value = ref<string | null>(null);
</script>

<template>
  <div :class="styles.stack">
    <RadioGroup v-model="value">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      <RadioGroupOption v-for="framework in frameworks" :key="framework" :value="framework">
        {{ framework }}
      </RadioGroupOption>
    </RadioGroup>
    <output>Selected: {{ value ?? 'none' }}</output>
  </div>
</template>