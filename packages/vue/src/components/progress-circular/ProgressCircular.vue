<script setup lang="ts">
import { ProgressRoot as ArkProgressRoot } from '@ark-ui/vue/progress';
import type { ProgressRootEmits, ProgressRootProps } from '@ark-ui/vue/progress';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ProgressCircular.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ ProgressRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-slot="progress-circular-root"
  >
    <slot />
  </ArkProgressRoot>
</template>