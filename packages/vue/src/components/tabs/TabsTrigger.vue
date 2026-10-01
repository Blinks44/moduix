<script setup lang="ts">
import { TabTrigger as ArkTabTrigger } from '@ark-ui/vue/tabs';
import type { TabTriggerProps } from '@ark-ui/vue/tabs';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tabs.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TabTriggerProps {
  class?: HTMLAttributes['class'];
  value: TabTriggerProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTabTrigger
    v-bind="attrs"
    :class="clsx(styles.trigger, className)"
    :value="value"
    data-slot="tabs-trigger"
  >
    <slot />
  </ArkTabTrigger>
</template>