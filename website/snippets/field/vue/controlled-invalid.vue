<script setup lang="ts">
import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import { computed, ref } from 'vue';
import styles from '@/components/examples/field/field-controlled-invalid.module.css';

const value = ref('');
const invalid = computed(() => value.value.length > 0 && value.value.length < 3);
</script>

<template>
  <Field :class="styles.root" :invalid="invalid">
    <FieldLabel>Username</FieldLabel>
    <Input v-model="value" placeholder="e.g. vinny" />
    <FieldHelperText>Use at least 3 characters.</FieldHelperText>
    <FieldErrorText>Username must be at least 3 characters.</FieldErrorText>
  </Field>
</template>