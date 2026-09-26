<script setup lang="ts">
import { ScrollAreaContent as ArkScrollAreaContent } from '@ark-ui/vue/scroll-area';
import type { ScrollAreaContentProps } from '@ark-ui/vue/scroll-area';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ScrollArea.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ScrollAreaContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkScrollAreaContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    data-slot="scroll-area-content"
  >
    <slot />
  </ArkScrollAreaContent>
</template>