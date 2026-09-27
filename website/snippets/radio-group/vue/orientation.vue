<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/vue/radio-group';
import styles from '@/components/examples/radio-group/radio-group-orientation.module.css';

const frameworks = ['React', 'Solid', 'Vue'];
</script>

<template>
  <RadioGroup orientation="horizontal" default-value="React">
    <RadioGroupLabel>Framework</RadioGroupLabel>
    <div :class="styles.items">
      <RadioGroupOption v-for="framework in frameworks" :key="framework" :value="framework">
        {{ framework }}
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>