<script setup lang="ts">
import { PopoverCloseTrigger as ArkPopoverCloseTrigger } from '@ark-ui/vue/popover';
import type { PopoverCloseTriggerProps } from '@ark-ui/vue/popover';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Popover.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverCloseTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPopoverCloseTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.closeTrigger, className)"
    data-slot="popover-close-trigger"
  >
    <slot />
  </ArkPopoverCloseTrigger>
</template>