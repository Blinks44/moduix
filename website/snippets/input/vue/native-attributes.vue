<script setup lang="ts">
import { Field, FieldLabel } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/input/input-native-attributes.module.css';
</script>

<template>
  <Field :class="styles.root">
    <FieldLabel>Security code</FieldLabel>
    <Input
      :html-size="8"
      input-mode="numeric"
      :max-length="6"
      name="security-code"
      autocomplete="one-time-code"
      placeholder="000000"
    />
  </Field>
</template>