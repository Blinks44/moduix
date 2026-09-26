<script setup lang="ts">
import { Field, FieldErrorText, FieldLabel } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/input/input-field-state.module.css';
</script>

<template>
  <Field :class="styles.root" invalid>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="name@example.com" />
    <FieldErrorText>Enter a valid email address.</FieldErrorText>
  </Field>
</template>