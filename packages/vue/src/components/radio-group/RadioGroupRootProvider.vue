<script setup lang="ts">
import { RadioGroupRootProvider as ArkRadioGroupRootProvider } from '@ark-ui/vue/radio-group';
import type { RadioGroupRootProviderProps } from '@ark-ui/vue/radio-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './RadioGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RadioGroupRootProviderProps {
  class?: HTMLAttributes['class'];
  value: RadioGroupRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRadioGroupRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="radio-group-root-provider"
  >
    <slot />
  </ArkRadioGroupRootProvider>
</template>