<script setup lang="ts">
import { Field, FieldErrorText, FieldHelperText } from '@moduix/vue/field';
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/vue/number-input';
import styles from '@/components/examples/number-input/number-input-field.module.css';
</script>

<template>
  <Field :class="styles.root" invalid>
    <NumberInput :min="1" :max="10" required>
      <NumberInputLabel>Items</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
    <FieldHelperText>Choose between 1 and 10 items.</FieldHelperText>
    <FieldErrorText>Value should be between 1 and 10.</FieldErrorText>
  </Field>
</template>