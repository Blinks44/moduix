<script setup lang="ts">
import { SplitterRoot as ArkSplitterRoot } from '@ark-ui/vue/splitter';
import type { SplitterRootEmits, SplitterRootProps } from '@ark-ui/vue/splitter';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SplitterRootProps {
  class?: HTMLAttributes['class'];
  panels: SplitterRootProps['panels'];
  style?: StyleValue;
}

export interface Emits extends /* @vue-ignore */ SplitterRootEmits {}

const { class: className, panels, style } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'group/splitter relative box-border h-112 min-h-0 w-full min-w-0 rounded-md border border-border bg-card text-foreground shadow-sm data-dragging:cursor-col-resize data-dragging:data-[orientation=vertical]:cursor-row-resize';
const rootStyle = computed<StyleValue>(() => [{ width: undefined, height: undefined }, style]);
</script>

<template>
  <ArkSplitterRoot
    v-bind="attrs"
    :panels="panels"
    :class="cn(rootClass, className)"
    :style="rootStyle"
    data-slot="splitter-root"
  >
    <slot />
  </ArkSplitterRoot>
</template>