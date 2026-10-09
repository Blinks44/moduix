<script setup lang="ts">
import { DateInputRootProvider as ArkDateInputRootProvider } from '@ark-ui/vue/date-input';
import type { DateInputRootProviderProps } from '@ark-ui/vue/date-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DateInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DateInputRootProviderProps {
  class?: HTMLAttributes['class'];
  value: DateInputRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDateInputRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="date-input-root-provider"
  >
    <slot />
  </ArkDateInputRootProvider>
</template>