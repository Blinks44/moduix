<script setup lang="ts">
import { ScrollAreaRootProvider as ArkScrollAreaRootProvider } from '@ark-ui/vue/scroll-area';
import type { ScrollAreaRootProviderProps } from '@ark-ui/vue/scroll-area';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ScrollArea.module.css';

defineOptions({ inheritAttrs: false });

export interface ModuixScrollAreaRootProviderProps
  extends /* @vue-ignore */ ScrollAreaRootProviderProps {
  class?: HTMLAttributes['class'];
  fade?: boolean;
  variant?: 'hover' | 'always';
  value: ScrollAreaRootProviderProps['value'];
}

const {
  class: className,
  fade = false,
  variant = 'hover',
  value,
} = defineProps<ModuixScrollAreaRootProviderProps>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkScrollAreaRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-fade="fade ? '' : undefined"
    :data-variant="variant"
    :value="value"
    data-slot="scroll-area-root-provider"
  >
    <slot />
  </ArkScrollAreaRootProvider>
</template>