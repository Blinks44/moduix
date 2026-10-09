<script setup lang="ts">
import { ProgressTrack as ArkProgressTrack } from '@ark-ui/vue/progress';
import type { ProgressTrackProps } from '@ark-ui/vue/progress';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ProgressLinear.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressTrackProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressTrack
    v-bind="attrs"
    :class="clsx(styles.track, className)"
    data-slot="progress-linear-track"
  >
    <slot />
  </ArkProgressTrack>
</template>