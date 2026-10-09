<script setup lang="ts">
import { Field, FieldHelperText, FieldLabel } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/field/field-disabled.module.css';
</script>

<template>
  <Field :class="styles.root" disabled>
    <FieldLabel>Organization</FieldLabel>
    <Input placeholder="Acme Inc." />
    <FieldHelperText>This field is currently managed by your workspace.</FieldHelperText>
  </Field>
</template>