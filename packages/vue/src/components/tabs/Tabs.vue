<script setup lang="ts">
import { TabsRoot as ArkTabsRoot } from '@ark-ui/vue/tabs';
import type { TabsRootEmits, TabsRootProps } from '@ark-ui/vue/tabs';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tabs.module.css';

defineOptions({ inheritAttrs: false });

type TabsVariant = 'default' | 'line';

export interface Props extends /* @vue-ignore */ TabsRootProps {
  class?: HTMLAttributes['class'];
  orientation?: TabsRootProps['orientation'];
  variant?: TabsVariant;
}

export interface Emits extends /* @vue-ignore */ TabsRootEmits {}

const { class: className, orientation, variant = 'default' } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTabsRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :orientation="orientation"
    :data-variant="orientation === 'vertical' ? 'default' : variant"
    data-slot="tabs-root"
  >
    <slot />
  </ArkTabsRoot>
</template>