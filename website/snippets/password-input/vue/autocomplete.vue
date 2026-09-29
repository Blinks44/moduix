<script setup lang="ts">
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/vue/password-input';
import styles from '@/components/examples/password-input/password-input-autocomplete.module.css';
</script>

<template>
  <PasswordInput :class="styles.root" auto-complete="new-password" name="new-password">
    <PasswordInputLabel>New password</PasswordInputLabel>
    <PasswordInputControl>
      <PasswordInputInput placeholder="Create a password" />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator />
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
  </PasswordInput>
</template>