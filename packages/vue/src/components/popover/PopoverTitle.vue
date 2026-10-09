<script setup lang="ts">
import { PopoverTitle as ArkPopoverTitle } from '@ark-ui/vue/popover';
import type { PopoverTitleProps } from '@ark-ui/vue/popover';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Popover.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverTitleProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPopoverTitle v-bind="attrs" :class="clsx(styles.title, className)" data-slot="popover-title">
    <slot />
  </ArkPopoverTitle>
</template>