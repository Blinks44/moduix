<script setup lang="ts">
import { ref } from 'vue';
import {
  Field,
  FieldErrorText,
  FieldHelperText,
  FieldItem,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRootProvider,
  useField,
} from '../src/components/field';
import { Input } from '../src/components/input';

const value = ref('');
const field = useField({ required: true });
</script>

<template>
  <Field required>
    <FieldItem value="email">
      <FieldLabel>Email <FieldRequiredIndicator /></FieldLabel>
      <Input v-model="value" />
      <FieldHelperText>Use your work email.</FieldHelperText>
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </FieldItem>
  </Field>
  <FieldRootProvider :value="field"><FieldLabel>Provider field</FieldLabel></FieldRootProvider>
</template>