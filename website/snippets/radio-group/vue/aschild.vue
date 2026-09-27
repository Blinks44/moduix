<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
} from '@moduix/vue/radio-group';
import styles from '@/components/examples/radio-group/radio-group-aschild.module.css';

const frameworks = ['React', 'Solid', 'Vue'];
</script>

<template>
  <RadioGroup default-value="React">
    <RadioGroupLabel>Framework</RadioGroupLabel>
    <RadioGroupItem v-for="framework in frameworks" :key="framework" as-child :value="framework">
      <label :class="styles.cardItem">
        <RadioGroupItemControl />
        <RadioGroupItemText>{{ framework }}</RadioGroupItemText>
        <RadioGroupItemHiddenInput />
      </label>
    </RadioGroupItem>
  </RadioGroup>
</template>