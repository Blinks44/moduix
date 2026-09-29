<script setup lang="ts">
import { PopoverDescription as ArkPopoverDescription } from '@ark-ui/vue/popover';
import type { PopoverDescriptionProps } from '@ark-ui/vue/popover';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Popover.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverDescriptionProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPopoverDescription
    v-bind="attrs"
    :class="clsx(styles.description, className)"
    data-slot="popover-description"
  >
    <slot />
  </ArkPopoverDescription>
</template>