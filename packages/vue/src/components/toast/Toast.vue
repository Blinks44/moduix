<script setup lang="ts">
import { ToastRoot as ArkToastRoot } from '@ark-ui/vue/toast';
import type { ToastRootProps } from '@ark-ui/vue/toast';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Toast.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ToastRootProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkToastRoot
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(styles.root, className)"
    data-slot="toast-root"
  >
    <slot />
  </ArkToastRoot>
</template>