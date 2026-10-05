<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '../../src';
</script>

<template>
  <RadioGroup default-value="React">
    <RadioGroupLabel>Framework</RadioGroupLabel>
    <RadioGroupOption value="React">React</RadioGroupOption>
    <RadioGroupOption value="Solid">Solid</RadioGroupOption>
  </RadioGroup>
</template>