<script setup lang="ts">
import { Field, FieldHelperText, FieldLabel } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/field/field-read-only.module.css';
</script>

<template>
  <Field :class="styles.root" read-only>
    <FieldLabel>Workspace key</FieldLabel>
    <Input model-value="MAPS" />
    <FieldHelperText>Read-only state is propagated to the input.</FieldHelperText>
  </Field>
</template>