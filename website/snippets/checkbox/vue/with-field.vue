<script setup lang="ts">
import { FieldErrorText, FieldHelperText, FieldRoot } from '@ark-ui/vue/field';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/vue/checkbox';
import styles from '@/components/examples/checkbox/checkbox-with-field.module.css';
</script>

<template>
  <FieldRoot :class="styles.root">
    <Checkbox required name="terms" value="accepted">
      <CheckboxControl />
      <CheckboxLabel>Accept terms</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
    <FieldHelperText>Required to continue.</FieldHelperText>
    <FieldErrorText>Please accept the terms.</FieldErrorText>
  </FieldRoot>
</template>