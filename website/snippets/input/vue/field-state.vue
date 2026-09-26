<script setup lang="ts">
import { FieldErrorText, FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/input/input-field-state.module.css';
</script>

<template>
  <FieldRoot :class="styles.root" invalid>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="name@example.com" />
    <FieldErrorText>Enter a valid email address.</FieldErrorText>
  </FieldRoot>
</template>