<script setup lang="ts">
import { ScrollAreaScrollbar as ArkScrollAreaScrollbar } from '@ark-ui/vue/scroll-area';
import type { ScrollAreaScrollbarProps } from '@ark-ui/vue/scroll-area';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ScrollArea.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ScrollAreaScrollbarProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkScrollAreaScrollbar
    v-bind="attrs"
    :class="clsx(styles.scrollbar, className)"
    data-slot="scroll-area-scrollbar"
  >
    <slot />
  </ArkScrollAreaScrollbar>
</template>