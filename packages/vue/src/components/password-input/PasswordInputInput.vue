<script setup lang="ts">
import { PasswordInputInput as ArkPasswordInputInput } from '@ark-ui/vue/password-input';
import type { PasswordInputInputProps } from '@ark-ui/vue/password-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './PasswordInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PasswordInputInputProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <ArkPasswordInputInput
    v-bind="attrs"
    :class="clsx(styles.input, className)"
    data-slot="password-input-input"
  />
</template>