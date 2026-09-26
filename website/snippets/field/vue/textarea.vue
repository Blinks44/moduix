<script setup lang="ts">
import { Field, FieldHelperText, FieldLabel, FieldTextarea } from '@moduix/vue/field';
import styles from '@/components/examples/field/field-textarea.module.css';
</script>

<template>
  <Field :class="styles.root">
    <FieldLabel>Summary</FieldLabel>
    <FieldTextarea autoresize placeholder="Describe the request" />
    <FieldHelperText>The textarea grows as the content expands.</FieldHelperText>
  </Field>
</template>