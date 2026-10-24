<script setup lang="ts">
import { TabsRootProvider as ArkTabsRootProvider } from '@ark-ui/vue/tabs';
import type { TabsRootProviderProps } from '@ark-ui/vue/tabs';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tabs.module.css';
import type { TabsSize, TabsVariant } from './Tabs.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TabsRootProviderProps {
  class?: HTMLAttributes['class'];
  value: TabsRootProviderProps['value'];
  variant?: TabsVariant;
  size?: TabsSize;
  fitted?: boolean;
}

const { class: className, value, variant = 'default', size = 'md', fitted } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTabsRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    :data-variant="variant"
    :data-size="size"
    :data-fitted="fitted ? '' : undefined"
    data-slot="tabs-root-provider"
  >
    <slot />
  </ArkTabsRootProvider>
</template>