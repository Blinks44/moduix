<script setup lang="ts">
import { PopoverArrow as ArkPopoverArrow } from '@ark-ui/vue/popover';
import type { PopoverArrowProps } from '@ark-ui/vue/popover';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Popover.module.css';
import PopoverArrowTip from './PopoverArrowTip.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverArrowProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPopoverArrow v-bind="attrs" :class="clsx(styles.arrow, className)" data-slot="popover-arrow">
    <PopoverArrowTip v-if="!$slots.default" />
    <slot v-else />
  </ArkPopoverArrow>
</template>