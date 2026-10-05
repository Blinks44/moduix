<script setup lang="ts">
import { Field, FieldLabel, FieldInput, FieldHelperText } from '../../src';
</script>

<template>
  <Field required>
    <FieldLabel>Name</FieldLabel>
    <FieldInput />
    <FieldHelperText>Use your public name.</FieldHelperText>
  </Field>
</template>