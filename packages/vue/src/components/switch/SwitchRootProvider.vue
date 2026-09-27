<script setup lang="ts">
import { SwitchRootProvider as ArkSwitchRootProvider } from '@ark-ui/vue/switch';
import type { SwitchRootProviderProps as ArkSwitchRootProviderProps } from '@ark-ui/vue/switch';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Switch.module.css';
import type { SwitchSize } from './Switch.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkSwitchRootProviderProps {
  class?: HTMLAttributes['class'];
  size?: SwitchSize;
  value: ArkSwitchRootProviderProps['value'];
}

const { class: className, size = 'md', value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSwitchRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-size="size"
    :value="value"
    data-slot="switch-root-provider"
  >
    <slot />
  </ArkSwitchRootProvider>
</template>