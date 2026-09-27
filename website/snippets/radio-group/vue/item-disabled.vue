<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/vue/radio-group';
</script>

<template>
  <RadioGroup default-value="React">
    <RadioGroupLabel>Framework</RadioGroupLabel>
    <RadioGroupOption value="React">React</RadioGroupOption>
    <RadioGroupOption disabled value="Solid">Solid</RadioGroupOption>
    <RadioGroupOption value="Vue">Vue</RadioGroupOption>
  </RadioGroup>
</template>