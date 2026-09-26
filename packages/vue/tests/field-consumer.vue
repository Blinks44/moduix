<script setup lang="ts">
import { ref } from 'vue';
import {
  Field,
  FieldErrorText,
  FieldHelperText,
  FieldInput,
  FieldItem,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRootProvider,
  FieldSelect,
  FieldTextarea,
  useField,
} from '../src/components/field';

const value = ref('');
const field = useField({ required: true });
</script>

<template>
  <Field required>
    <FieldItem value="email">
      <FieldLabel>Email <FieldRequiredIndicator /></FieldLabel>
      <FieldInput v-model="value" />
      <FieldHelperText>Use your work email.</FieldHelperText>
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </FieldItem>
  </Field>
  <Field><FieldTextarea autoresize /></Field>
  <Field
    ><FieldSelect><option value="one">One</option></FieldSelect></Field
  >
  <FieldRootProvider :value="field"><FieldLabel>Provider field</FieldLabel></FieldRootProvider>
</template>