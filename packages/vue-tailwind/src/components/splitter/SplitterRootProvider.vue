<script setup lang="ts">
import { SplitterRootProvider as ArkSplitterRootProvider } from '@ark-ui/vue/splitter';
import type { SplitterRootProviderProps } from '@ark-ui/vue/splitter';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SplitterRootProviderProps {
  class?: HTMLAttributes['class'];
  style?: StyleValue;
  value: SplitterRootProviderProps['value'];
}

const { class: className, style, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'group/splitter relative box-border h-112 min-h-0 w-full min-w-0 rounded-md border border-border bg-card text-foreground shadow-sm data-dragging:cursor-col-resize data-dragging:data-[orientation=vertical]:cursor-row-resize';
const rootStyle = computed<StyleValue>(() => [{ width: undefined, height: undefined }, style]);
</script>

<template>
  <ArkSplitterRootProvider
    v-bind="attrs"
    :value="value"
    :class="cn(rootClass, className)"
    :style="rootStyle"
    data-slot="splitter-root-provider"
  >
    <slot />
  </ArkSplitterRootProvider>
</template>