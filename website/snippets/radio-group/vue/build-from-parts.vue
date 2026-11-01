<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
} from '@moduix/vue/radio-group';

const frameworks = ['React', 'Solid', 'Vue'];
</script>

<template>
  <RadioGroup default-value="React">
    <RadioGroupLabel>Framework</RadioGroupLabel>
    <RadioGroupItem v-for="framework in frameworks" :key="framework" :value="framework">
      <RadioGroupItemControl />
      <RadioGroupItemText>{{ framework }}</RadioGroupItemText>
      <RadioGroupItemHiddenInput />
    </RadioGroupItem>
  </RadioGroup>
</template>