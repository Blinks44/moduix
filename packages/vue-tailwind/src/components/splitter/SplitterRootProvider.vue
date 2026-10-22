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
  'box-border h-full w-full rounded-md border border-border bg-card text-card-foreground shadow-sm';
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