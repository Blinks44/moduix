<script setup lang="ts">
import { RadioGroup, RadioGroupIndicator, RadioGroupOption } from '@moduix/vue/radio-group';
import { Stack } from '@moduix/vue/stack';
import styles from '@/components/examples/radio-group/radio-group-indicator.module.css';

const frameworks = ['React', 'Solid', 'Vue'];
</script>

<template>
  <Stack gap="2">
    <div>Framework</div>
    <RadioGroup aria-label="Framework" default-value="React" :class="styles.root">
      <RadioGroupIndicator />
      <RadioGroupOption v-for="framework in frameworks" :key="framework" :value="framework">
        {{ framework }}
      </RadioGroupOption>
    </RadioGroup>
  </Stack>
</template>