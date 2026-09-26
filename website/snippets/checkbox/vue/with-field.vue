<script setup lang="ts">
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/vue/checkbox';
import { Field, FieldErrorText, FieldHelperText } from '@moduix/vue/field';
import styles from '@/components/examples/checkbox/checkbox-with-field.module.css';
</script>

<template>
  <Field :class="styles.root">
    <Checkbox required name="terms" value="accepted">
      <CheckboxControl />
      <CheckboxLabel>Accept terms</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
    <FieldHelperText>Required to continue.</FieldHelperText>
    <FieldErrorText>Please accept the terms.</FieldErrorText>
  </Field>
</template>