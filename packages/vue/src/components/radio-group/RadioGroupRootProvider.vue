<script setup lang="ts">
import { RadioGroupRootProvider as ArkRadioGroupRootProvider } from '@ark-ui/vue/radio-group';
import type { RadioGroupRootProviderProps } from '@ark-ui/vue/radio-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './RadioGroup.module.css';
import type { RadioGroupSize } from './RadioGroup.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RadioGroupRootProviderProps {
  class?: HTMLAttributes['class'];
  size?: RadioGroupSize;
  value: RadioGroupRootProviderProps['value'];
}

const { class: className, size = 'md', value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRadioGroupRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-size="size"
    :value="value"
    data-slot="radio-group-root-provider"
  >
    <slot />
  </ArkRadioGroupRootProvider>
</template>