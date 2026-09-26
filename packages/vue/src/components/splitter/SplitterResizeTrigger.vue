<script setup lang="ts">
import { SplitterResizeTrigger as ArkSplitterResizeTrigger } from '@ark-ui/vue/splitter';
import type { SplitterResizeTriggerProps } from '@ark-ui/vue/splitter';
import { clsx } from 'clsx';
import { useAttrs, useSlots } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Splitter.module.css';
import SplitterResizeTriggerIndicator from './SplitterResizeTriggerIndicator.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SplitterResizeTriggerProps {
  asChild?: SplitterResizeTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
  id: SplitterResizeTriggerProps['id'];
}

const { asChild = false, class: className, id } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const slots = useSlots();
</script>

<template>
  <ArkSplitterResizeTrigger
    v-bind="attrs"
    :as-child="asChild"
    :id="id"
    :class="clsx(styles.resizeTrigger, className)"
    data-slot="splitter-resize-trigger"
  >
    <SplitterResizeTriggerIndicator v-if="!asChild && !slots.default" />
    <slot v-else />
  </ArkSplitterResizeTrigger>
</template>