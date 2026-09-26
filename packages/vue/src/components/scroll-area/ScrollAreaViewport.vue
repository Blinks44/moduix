<script setup lang="ts">
import { ScrollAreaViewport as ArkScrollAreaViewport } from '@ark-ui/vue/scroll-area';
import type { ScrollAreaViewportProps } from '@ark-ui/vue/scroll-area';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ScrollArea.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ScrollAreaViewportProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkScrollAreaViewport
    v-bind="attrs"
    :class="clsx(styles.viewport, className)"
    data-slot="scroll-area-viewport"
  >
    <slot />
  </ArkScrollAreaViewport>
</template>