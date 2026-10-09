<script setup lang="ts">
import { RadioGroup, RadioGroupIndicator, RadioGroupOption } from '@moduix/vue/radio-group';
import styles from '@/components/examples/radio-group/radio-group-indicator.module.css';

const frameworks = ['React', 'Solid', 'Vue'];
</script>

<template>
  <div :class="styles.stack">
    <div>Framework</div>
    <RadioGroup aria-label="Framework" default-value="React" :class="styles.root">
      <RadioGroupIndicator :class="styles.indicator" />
      <RadioGroupOption v-for="framework in frameworks" :key="framework" :value="framework">
        {{ framework }}
      </RadioGroupOption>
    </RadioGroup>
  </div>
</template>