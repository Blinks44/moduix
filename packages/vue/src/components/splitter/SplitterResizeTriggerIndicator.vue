<script setup lang="ts">
import { SplitterResizeTriggerIndicator as ArkSplitterResizeTriggerIndicator } from '@ark-ui/vue/splitter';
import type { SplitterResizeTriggerIndicatorProps } from '@ark-ui/vue/splitter';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Splitter.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SplitterResizeTriggerIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSplitterResizeTriggerIndicator
    v-bind="attrs"
    :class="clsx(styles.resizeTriggerIndicator, className)"
    data-slot="splitter-resize-trigger-indicator"
  >
    <slot />
  </ArkSplitterResizeTriggerIndicator>
</template>