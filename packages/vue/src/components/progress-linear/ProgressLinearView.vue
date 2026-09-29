<script setup lang="ts">
import { ProgressView as ArkProgressView } from '@ark-ui/vue/progress';
import type { ProgressViewProps } from '@ark-ui/vue/progress';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ProgressLinear.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressViewProps {
  class?: HTMLAttributes['class'];
  state: ProgressViewProps['state'];
}

const { class: className, state } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressView
    v-bind="attrs"
    :class="clsx(styles.view, className)"
    :state="state"
    data-slot="progress-linear-view"
  >
    <slot />
  </ArkProgressView>
</template>