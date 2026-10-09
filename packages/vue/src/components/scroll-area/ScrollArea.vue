<script setup lang="ts">
import { ScrollAreaRoot as ArkScrollAreaRoot } from '@ark-ui/vue/scroll-area';
import type { ScrollAreaRootProps } from '@ark-ui/vue/scroll-area';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ScrollArea.module.css';

defineOptions({ inheritAttrs: false });

export interface ModuixScrollAreaRootProps extends /* @vue-ignore */ ScrollAreaRootProps {
  class?: HTMLAttributes['class'];
  fade?: boolean;
  variant?: 'hover' | 'always';
}

const {
  class: className,
  fade = false,
  variant = 'hover',
} = defineProps<ModuixScrollAreaRootProps>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkScrollAreaRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-fade="fade ? '' : undefined"
    :data-variant="variant"
    data-slot="scroll-area-root"
  >
    <slot />
  </ArkScrollAreaRoot>
</template>