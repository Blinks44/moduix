<script setup lang="ts">
import {
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputRootProvider,
  PasswordInputVisibilityTrigger,
  usePasswordInput,
} from '@moduix/vue/password-input';
import styles from '@/components/examples/password-input/password-input-root-provider.module.css';

const passwordInput = usePasswordInput();
</script>

<template>
  <PasswordInputRootProvider :class="styles.root" :value="passwordInput">
    <PasswordInputLabel>Password</PasswordInputLabel>
    <PasswordInputControl>
      <PasswordInputInput placeholder="Managed outside the tree" />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator />
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
  </PasswordInputRootProvider>
  <output>Visibility: {{ passwordInput.visible ? 'visible' : 'hidden' }}</output>
</template>