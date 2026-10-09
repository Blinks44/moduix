<script setup lang="ts">
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/vue/password-input';
import { ref } from 'vue';
import styles from '@/components/examples/password-input/password-input-controlled-visibility.module.css';

const visible = ref(false);
</script>

<template>
  <PasswordInput :class="styles.root" v-model:visible="visible">
    <PasswordInputLabel>Password</PasswordInputLabel>
    <PasswordInputControl>
      <PasswordInputInput placeholder="Toggle visibility" />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator />
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
  </PasswordInput>
  <output>Visibility: {{ visible ? 'visible' : 'hidden' }}</output>
</template>