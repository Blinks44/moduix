<script setup lang="ts">
import { PasswordInput, PasswordInputField, PasswordInputLabel } from '@moduix/vue/password-input';
import styles from '@/components/examples/password-input/password-input-sizes.module.css';

const sizes = [
  ['xs', 'Extra small'],
  ['sm', 'Small'],
  ['md', 'Medium'],
  ['lg', 'Large'],
  ['xl', 'Extra large'],
] as const;
</script>

<template>
  <div :class="styles.root">
    <PasswordInput v-for="[size, label] in sizes" :key="size" :size="size">
      <PasswordInputLabel>{{ label }}</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  </div>
</template>