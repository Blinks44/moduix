<script setup lang="ts">
import { ScrollAreaRoot as ArkScrollAreaRoot } from '@ark-ui/vue/scroll-area';
import type { ScrollAreaRootProps } from '@ark-ui/vue/scroll-area';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export type ScrollAreaVariant = 'hover' | 'always';

export interface Props extends /* @vue-ignore */ ScrollAreaRootProps {
  class?: HTMLAttributes['class'];
  fade?: boolean;
  variant?: ScrollAreaVariant;
}

const { class: className, fade = false, variant = 'hover' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass = 'group/scroll-area h-full min-h-0 w-full min-w-0';
</script>

<template>
  <ArkScrollAreaRoot
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :data-fade="fade ? '' : undefined"
    :data-variant="variant"
    data-slot="scroll-area-root"
  >
    <slot />
  </ArkScrollAreaRoot>
</template>