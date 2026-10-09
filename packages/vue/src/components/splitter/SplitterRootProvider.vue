<script setup lang="ts">
import { SplitterRootProvider as ArkSplitterRootProvider } from '@ark-ui/vue/splitter';
import type { SplitterRootProviderProps } from '@ark-ui/vue/splitter';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import styles from './Splitter.module.css';

const rootStyle = {
  width: 'var(--moduix-splitter-width, 100%)',
  height: 'var(--moduix-splitter-height, 28rem)',
};

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SplitterRootProviderProps {
  class?: HTMLAttributes['class'];
  style?: StyleValue;
  value: SplitterRootProviderProps['value'];
}

const { class: className, style, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootStyleValue = computed<StyleValue>(() => [rootStyle, style]);
</script>

<template>
  <ArkSplitterRootProvider
    v-bind="attrs"
    :value="value"
    :class="clsx(styles.root, className)"
    :style="rootStyleValue"
    data-slot="splitter-root-provider"
  >
    <slot />
  </ArkSplitterRootProvider>
</template>