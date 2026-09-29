<script setup lang="ts">
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/vue/password-input';
import styles from '@/components/examples/password-input/password-input-advanced-customization.module.css';
</script>

<template>
  <PasswordInput :class="styles.root">
    <PasswordInputLabel>Password</PasswordInputLabel>
    <PasswordInputControl>
      <PasswordInputInput placeholder="Enter your password" />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator />
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
  </PasswordInput>
</template>