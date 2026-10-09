<script setup lang="ts">
import { PopoverTrigger as ArkPopoverTrigger } from '@ark-ui/vue/popover';
import type { PopoverTriggerProps } from '@ark-ui/vue/popover';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Popover.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPopoverTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.trigger, className)"
    data-slot="popover-trigger"
  >
    <slot />
  </ArkPopoverTrigger>
</template>