<script setup lang="ts">
import { NumberInputRootProvider as ArkNumberInputRootProvider } from '@ark-ui/vue/number-input';
import type { NumberInputRootProviderProps } from '@ark-ui/vue/number-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NumberInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputRootProviderProps {
  class?: HTMLAttributes['class'];
  value: NumberInputRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="number-input-root-provider"
  >
    <slot />
  </ArkNumberInputRootProvider>
</template>