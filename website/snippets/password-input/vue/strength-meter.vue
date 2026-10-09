<script setup lang="ts">
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/vue/password-input';
import { computed, ref } from 'vue';
import styles from '@/components/examples/password-input/password-input-strength-meter.module.css';

const password = ref('asdfasdf');
const strength = computed(() => getPasswordStrength(password.value));

const handlePasswordInput = (event: Event) => {
  if (event.target instanceof HTMLInputElement) password.value = event.target.value;
};

function getPasswordStrength(value: string) {
  if (!value) return null;
  if (value.length >= 10 && /[0-9]/.test(value) && /[^a-zA-Z0-9]/.test(value)) return 'strong';
  if (value.length >= 6) return 'medium';
  return 'weak';
}
</script>

<template>
  <PasswordInput :class="styles.root">
    <PasswordInputLabel>Password</PasswordInputLabel>
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
    <div v-if="strength" :class="styles.strengthMeter">
      <div :class="styles.strengthBar">
        <div :class="styles.strengthFill" :data-strength="strength" />
      </div>
      <div :class="styles.strengthLabel">{{ strength }} password</div>
    </div>
  </PasswordInput>
</template>