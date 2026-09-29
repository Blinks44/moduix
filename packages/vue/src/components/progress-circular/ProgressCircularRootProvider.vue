<script setup lang="ts">
import { ProgressRootProvider as ArkProgressRootProvider } from '@ark-ui/vue/progress';
import type { ProgressRootProviderProps } from '@ark-ui/vue/progress';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ProgressCircular.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressRootProviderProps {
  class?: HTMLAttributes['class'];
  value: ProgressRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="progress-circular-root-provider"
  >
    <slot />
  </ArkProgressRootProvider>
</template>