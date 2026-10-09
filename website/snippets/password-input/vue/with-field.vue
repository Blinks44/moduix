<script setup lang="ts">
import { Field, FieldErrorText, FieldHelperText } from '@moduix/vue/field';
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/vue/password-input';
import styles from '@/components/examples/password-input/password-input-with-field.module.css';
</script>

<template>
  <Field :class="styles.root" invalid>
    <PasswordInput required>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputControl>
        <PasswordInputInput placeholder="Enter your password" />
        <PasswordInputVisibilityTrigger>
          <PasswordInputIndicator />
        </PasswordInputVisibilityTrigger>
      </PasswordInputControl>
    </PasswordInput>
    <FieldHelperText>Enter your password.</FieldHelperText>
    <FieldErrorText>Password is required.</FieldErrorText>
  </Field>
</template>