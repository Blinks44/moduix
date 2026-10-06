<script setup lang="ts">
import { ref } from 'vue';
import { Field, FieldLabel, FieldInput, FieldHelperText } from '../../src';

const name = ref('Initial name');
</script>

<template>
  <Field required>
    <FieldLabel>Name</FieldLabel>
    <FieldInput v-model="name" name="name" />
    <FieldHelperText>Use your public name.</FieldHelperText>
  </Field>
</template>