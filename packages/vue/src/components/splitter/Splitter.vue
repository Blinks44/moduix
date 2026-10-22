<script setup lang="ts">
import { SplitterRoot as ArkSplitterRoot } from '@ark-ui/vue/splitter';
import type { SplitterRootEmits, SplitterRootProps } from '@ark-ui/vue/splitter';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import styles from './Splitter.module.css';

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
const rootStyle = computed<StyleValue>(() => [{ width: undefined, height: undefined }, style]);
</script>

<template>
  <ArkSplitterRoot
    v-bind="attrs"
    :panels="panels"
    :class="clsx(styles.root, className)"
    :style="rootStyle"
    data-slot="splitter-root"
  >
    <slot />
  </ArkSplitterRoot>
</template>