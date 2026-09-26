<script setup lang="ts">
import { Field, FieldHelperText, FieldLabel, FieldSelect } from '@moduix/vue/field';
import styles from '@/components/examples/field/field-native-select.module.css';
</script>

<template>
  <Field :class="styles.root" required>
    <FieldLabel>Priority</FieldLabel>
    <FieldSelect name="priority">
      <option value="" disabled>Select priority</option>
      <option value="low">Low</option>
      <option value="normal">Normal</option>
      <option value="high">High</option>
    </FieldSelect>
    <FieldHelperText>Used for triage queues.</FieldHelperText>
  </Field>
</template>