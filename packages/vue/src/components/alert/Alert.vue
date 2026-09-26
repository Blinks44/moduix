<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Alert.module.css';

defineOptions({ inheritAttrs: false });

type AlertStatus = 'info' | 'success' | 'warning' | 'error';

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
  status?: AlertStatus;
}

const { class: className, status = 'info' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-scope="alert"
    data-part="root"
    :data-status="status"
    data-slot="alert-root"
  >
    <slot />
  </ark.div>
</template>