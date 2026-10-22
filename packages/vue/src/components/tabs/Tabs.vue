<script setup lang="ts">
import { TabsRoot as ArkTabsRoot } from '@ark-ui/vue/tabs';
import type { TabsRootEmits, TabsRootProps } from '@ark-ui/vue/tabs';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tabs.module.css';

defineOptions({ inheritAttrs: false });

export type TabsVariant = 'default' | 'line';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface Props extends /* @vue-ignore */ TabsRootProps {
  class?: HTMLAttributes['class'];
  variant?: TabsVariant;
  size?: TabsSize;
  fitted?: boolean;
}

export interface Emits extends /* @vue-ignore */ TabsRootEmits {}

const { class: className, variant = 'default', size = 'md', fitted } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTabsRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-variant="variant"
    :data-size="size"
    :data-fitted="fitted ? '' : undefined"
    data-slot="tabs-root"
  >
    <slot />
  </ArkTabsRoot>
</template>