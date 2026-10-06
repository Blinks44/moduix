<script setup lang="ts">
import { Field, FieldErrorText, FieldLabel } from '@moduix/vue/field';
import { NativeSelect } from '@moduix/vue/native-select';
import styles from '@/components/examples/native-select/native-select-field-integration.module.css';

const frameworkOptions = [
  {
    value: '',
    label: 'Choose framework',
    disabled: true,
  },
  {
    value: 'react',
    label: 'React',
  },
  {
    value: 'vue',
    label: 'Vue',
  },
  {
    value: 'svelte',
    label: 'Svelte',
  },
];
</script>

<template>
  <Field :class="styles.root" invalid required>
    <FieldLabel>Framework</FieldLabel>
    <NativeSelect name="framework">
      <option
        v-for="option in frameworkOptions"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
        :selected="option.value === ''"
      >
        {{ option.label }}
      </option>
    </NativeSelect>
    <FieldErrorText>Select a framework.</FieldErrorText>
  </Field>
</template>