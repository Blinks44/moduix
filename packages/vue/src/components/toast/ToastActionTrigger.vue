<script setup lang="ts">
import { ToastActionTrigger as ArkToastActionTrigger } from '@ark-ui/vue/toast';
import type { ToastActionTriggerProps } from '@ark-ui/vue/toast';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Toast.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ToastActionTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkToastActionTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.actionTrigger, className)"
    data-slot="toast-action-trigger"
  >
    <slot />
  </ArkToastActionTrigger>
</template>