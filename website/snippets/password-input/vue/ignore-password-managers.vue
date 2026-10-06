<script setup lang="ts">
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/vue/password-input';
import styles from '@/components/examples/password-input/password-input-ignore-password-managers.module.css';
</script>

<template>
  <PasswordInput :class="styles.root" ignore-password-managers>
    <PasswordInputLabel>API key</PasswordInputLabel>
    <PasswordInputControl>
      <PasswordInputInput :defaultValue="'spd_1234567890'" />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator />
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
  </PasswordInput>
</template>