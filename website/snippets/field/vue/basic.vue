<script setup lang="ts">
import { Field, FieldHelperText, FieldLabel, FieldRequiredIndicator } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/field/field-basic.module.css';
</script>

<template>
  <Field :class="styles.root" required>
    <FieldLabel>Name <FieldRequiredIndicator /></FieldLabel>
    <Input placeholder="Enter your name" />
    <FieldHelperText>Visible on your public profile.</FieldHelperText>
  </Field>
</template>