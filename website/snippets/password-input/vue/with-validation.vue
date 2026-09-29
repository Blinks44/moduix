<script setup lang="ts">
import { Field, FieldErrorText } from '@moduix/vue/field';
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/vue/password-input';
import { computed, ref } from 'vue';
import styles from '@/components/examples/password-input/password-input-with-validation.module.css';

const password = ref('');
const isValid = computed(() => password.value.length >= 8);
const invalid = computed(() => !isValid.value && password.value.length > 0);

const handlePasswordInput = (event: Event) => {
  if (event.target instanceof HTMLInputElement) password.value = event.target.value;
};
</script>

<template>
  <Field :class="styles.root" :invalid="invalid">
    <PasswordInput>
      <PasswordInputLabel>Password (min 8 characters)</PasswordInputLabel>
      <PasswordInputControl>
        <PasswordInputInput
          :value="password"
          @input="handlePasswordInput"
          placeholder="Enter your password"
        />
        <PasswordInputVisibilityTrigger>
          <PasswordInputIndicator />
        </PasswordInputVisibilityTrigger>
      </PasswordInputControl>
    </PasswordInput>
    <FieldErrorText>Password must be at least 8 characters.</FieldErrorText>
  </Field>
</template>