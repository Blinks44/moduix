<script setup lang="ts">
import { CheckboxRootProvider as ArkCheckboxRootProvider } from '@ark-ui/vue/checkbox';
import type { CheckboxRootProviderProps } from '@ark-ui/vue/checkbox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Checkbox.module.css';

defineOptions({ inheritAttrs: false });

type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ CheckboxRootProviderProps {
  class?: HTMLAttributes['class'];
  size?: CheckboxSize;
  value: CheckboxRootProviderProps['value'];
}

const { class: className, size = 'md', value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCheckboxRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-size="size"
    :value="value"
    data-slot="checkbox-root-provider"
  >
    <slot />
  </ArkCheckboxRootProvider>
</template>