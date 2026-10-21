<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@moduix/vue/radio-group';
import styles from '@/components/examples/radio-group/radio-group-sizes.module.css';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<template>
  <div :class="styles.row">
    <RadioGroup
      v-for="size in sizes"
      :key="size"
      :size="size"
      :default-value="size"
      :aria-label="`Size ${size}`"
    >
      <RadioGroupOption :value="size">{{ size.toUpperCase() }}</RadioGroupOption>
    </RadioGroup>
  </div>
</template>