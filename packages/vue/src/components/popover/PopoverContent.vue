<script setup lang="ts">
import { PopoverContent as ArkPopoverContent } from '@ark-ui/vue/popover';
import type { PopoverContentProps } from '@ark-ui/vue/popover';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Popover.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPopoverContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    data-slot="popover-content"
  >
    <slot />
  </ArkPopoverContent>
</template>