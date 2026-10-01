<script setup lang="ts">
import { StepsRootProvider as ArkStepsRootProvider } from '@ark-ui/vue/steps';
import type { StepsRootProviderProps } from '@ark-ui/vue/steps';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Steps.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsRootProviderProps {
  class?: HTMLAttributes['class'];
  value: StepsRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="steps-root-provider"
  >
    <slot />
  </ArkStepsRootProvider>
</template>