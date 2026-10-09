<script setup lang="ts">
import {
  PasswordInputContext as ArkPasswordInputContext,
  usePasswordInputContext,
} from '@ark-ui/vue/password-input';
import type {
  PasswordInputContextProps as ArkPasswordInputContextProps,
  UsePasswordInputContext,
} from '@ark-ui/vue/password-input';
import type { UnwrapRef } from 'vue';

export type PasswordInputContextProps = Omit<ArkPasswordInputContextProps, 'value'>;

defineSlots<{ default: (passwordInput: UnwrapRef<UsePasswordInputContext>) => unknown }>();

const context = { value: usePasswordInputContext() };
</script>

<template>
  <ArkPasswordInputContext :value="context.value" v-slot="passwordInput">
    <slot v-bind="passwordInput" />
  </ArkPasswordInputContext>
</template>