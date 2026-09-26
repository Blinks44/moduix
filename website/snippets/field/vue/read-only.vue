<script setup lang="ts">
import { Field, FieldHelperText, FieldInput, FieldLabel } from '@moduix/vue/field';
import styles from '@/components/examples/field/field-read-only.module.css';
</script>

<template>
  <Field :class="styles.root" read-only>
    <FieldLabel>Workspace key</FieldLabel>
    <FieldInput default-value="MAPS" />
    <FieldHelperText>Read-only state is propagated to the input.</FieldHelperText>
  </Field>
</template>