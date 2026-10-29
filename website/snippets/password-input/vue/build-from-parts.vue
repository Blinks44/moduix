<script setup lang="ts">
import { Eye as EyeIcon, EyeClosed as EyeClosedIcon } from '@lucide/vue';
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/vue/password-input';
import styles from '@/components/examples/password-input/password-input-basic.module.css';
</script>

<template>
  <PasswordInput :class="styles.root" auto-complete="current-password">
    <PasswordInputLabel>Password</PasswordInputLabel>
    <PasswordInputControl>
      <PasswordInputInput />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator>
          <EyeIcon />
          <template #fallback><EyeClosedIcon /></template>
        </PasswordInputIndicator>
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
  </PasswordInput>
</template>