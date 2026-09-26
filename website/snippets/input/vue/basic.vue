<script setup lang="ts">
import { Field, FieldHelperText, FieldLabel } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/input/input-basic.module.css';
</script>

<template>
  <Field :class="styles.root">
    <FieldLabel>Name</FieldLabel>
    <FieldHelperText>Used in your public workspace profile.</FieldHelperText>
    <Input name="name" placeholder="Enter your name" />
  </Field>
</template>