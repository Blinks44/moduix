<script setup lang="ts">
import { Field, FieldHelperText, FieldLabel } from '@moduix/vue/field';
import { Textarea } from '@moduix/vue/textarea';
import styles from '@/components/examples/field/field-textarea.module.css';
</script>

<template>
  <Field :class="styles.root">
    <FieldLabel>Summary</FieldLabel>
    <Textarea autoresize placeholder="Describe the request" />
    <FieldHelperText>The textarea grows as the content expands.</FieldHelperText>
  </Field>
</template>