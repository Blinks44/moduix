<script setup lang="ts">
import { Field, FieldHelperText, FieldLabel } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/input/input-file-input.module.css';
</script>

<template>
  <Field :class="styles.root">
    <FieldLabel>Attachment</FieldLabel>
    <Input accept=".pdf,.png" type="file" />
    <FieldHelperText>Choose a PDF or PNG file.</FieldHelperText>
  </Field>
</template>