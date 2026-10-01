<script setup lang="ts">
import { TabsRootProvider as ArkTabsRootProvider } from '@ark-ui/vue/tabs';
import type { TabsRootProviderProps } from '@ark-ui/vue/tabs';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tabs.module.css';

defineOptions({ inheritAttrs: false });

type TabsVariant = 'default' | 'line';

export interface Props extends /* @vue-ignore */ TabsRootProviderProps {
  class?: HTMLAttributes['class'];
  value: TabsRootProviderProps['value'];
  variant?: TabsVariant;
}

const { class: className, value, variant = 'default' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const orientation = computed(
  () =>
    (
      value.getRootProps() as {
        'data-orientation'?: 'horizontal' | 'vertical';
      }
    )['data-orientation'],
);
</script>

<template>
  <ArkTabsRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    :data-variant="orientation === 'vertical' ? 'default' : variant"
    data-slot="tabs-root-provider"
  >
    <slot />
  </ArkTabsRootProvider>
</template>