<script setup lang="ts">
import { PasswordInput, PasswordInputField, PasswordInputLabel } from '@moduix/vue/password-input';
import styles from '@/components/examples/password-input/password-input-basic.module.css';
</script>

<template>
  <PasswordInput :class="styles.root" auto-complete="current-password">
    <PasswordInputLabel>Password</PasswordInputLabel>
    <PasswordInputField />
  </PasswordInput>
</template>