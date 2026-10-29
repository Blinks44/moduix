<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/vue/radio-group';
import { Stack } from '@moduix/vue/stack';

const frameworks = ['React', 'Solid', 'Vue'];
</script>

<template>
  <RadioGroup orientation="horizontal" default-value="React">
    <RadioGroupLabel>Framework</RadioGroupLabel>
    <Stack direction="row" wrap="wrap" gap="2">
      <RadioGroupOption v-for="framework in frameworks" :key="framework" :value="framework">
        {{ framework }}
      </RadioGroupOption>
    </Stack>
  </RadioGroup>
</template>