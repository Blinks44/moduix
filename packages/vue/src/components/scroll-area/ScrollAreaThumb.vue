<script setup lang="ts">
import { ScrollAreaThumb as ArkScrollAreaThumb } from '@ark-ui/vue/scroll-area';
import type { ScrollAreaThumbProps } from '@ark-ui/vue/scroll-area';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ScrollArea.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ScrollAreaThumbProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkScrollAreaThumb
    v-bind="attrs"
    :class="clsx(styles.thumb, className)"
    data-slot="scroll-area-thumb"
  >
    <slot />
  </ArkScrollAreaThumb>
</template>