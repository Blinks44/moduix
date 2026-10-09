<script setup lang="ts">
import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@moduix/vue/field';
import { Textarea } from '@moduix/vue/textarea';
import styles from '@/components/examples/textarea/textarea-field-validation.module.css';
</script>

<template>
  <Field :class="styles.root" invalid required>
    <FieldLabel>Details</FieldLabel>
    <Textarea :min-length="10" placeholder="Add at least 10 characters" />
    <FieldHelperText>Include enough detail for the team to reproduce the issue.</FieldHelperText>
    <FieldErrorText>Please provide details.</FieldErrorText>
    <FieldErrorText>Enter at least 10 characters.</FieldErrorText>
  </Field>
</template>