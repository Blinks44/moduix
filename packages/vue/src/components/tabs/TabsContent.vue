<script setup lang="ts">
import { TabContent as ArkTabContent } from '@ark-ui/vue/tabs';
import type { TabContentProps } from '@ark-ui/vue/tabs';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tabs.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TabContentProps {
  class?: HTMLAttributes['class'];
  value: TabContentProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTabContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    :value="value"
    data-slot="tabs-content"
  >
    <slot />
  </ArkTabContent>
</template>