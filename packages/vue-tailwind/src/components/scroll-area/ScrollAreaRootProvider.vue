<script setup lang="ts">
import { ScrollAreaRootProvider as ArkScrollAreaRootProvider } from '@ark-ui/vue/scroll-area';
import type { ScrollAreaRootProviderProps } from '@ark-ui/vue/scroll-area';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import type { ScrollAreaVariant } from './ScrollArea.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ScrollAreaRootProviderProps {
  class?: HTMLAttributes['class'];
  fade?: boolean;
  variant?: ScrollAreaVariant;
  value: ScrollAreaRootProviderProps['value'];
}

const { class: className, fade = false, variant = 'hover', value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass = 'group/scroll-area h-full min-h-0 w-full min-w-0';
</script>

<template>
  <ArkScrollAreaRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :data-fade="fade ? '' : undefined"
    :data-variant="variant"
    :value="value"
    data-slot="scroll-area-root-provider"
  >
    <slot />
  </ArkScrollAreaRootProvider>
</template>