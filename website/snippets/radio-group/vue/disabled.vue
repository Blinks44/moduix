<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/vue/radio-group';

const frameworks = ['React', 'Solid', 'Vue'];
</script>

<template>
  <RadioGroup default-value="React" disabled>
    <RadioGroupLabel>Framework</RadioGroupLabel>
    <RadioGroupOption v-for="framework in frameworks" :key="framework" :value="framework">
      {{ framework }}
    </RadioGroupOption>
  </RadioGroup>
</template>