<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/vue/radio-group';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<template>
  <RadioGroup default-value="md">
    <RadioGroupLabel>Control Size</RadioGroupLabel>
    <RadioGroupOption v-for="size in sizes" :key="size" :value="size" :size="size">
      {{ size.toUpperCase() }}
    </RadioGroupOption>
  </RadioGroup>
</template>