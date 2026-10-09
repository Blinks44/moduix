<script setup lang="ts">
import { ProgressCircleTrack as ArkProgressCircleTrack } from '@ark-ui/vue/progress';
import type { ProgressCircleTrackProps } from '@ark-ui/vue/progress';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ProgressCircular.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressCircleTrackProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressCircleTrack
    v-bind="attrs"
    :class="clsx(styles.circleTrack, className)"
    data-slot="progress-circular-circle-track"
  >
    <slot />
  </ArkProgressCircleTrack>
</template>