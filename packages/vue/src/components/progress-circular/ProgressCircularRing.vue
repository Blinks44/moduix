<script setup lang="ts">
import type { ProgressCircleProps } from '@ark-ui/vue/progress';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import ProgressCircularCircle from './ProgressCircularCircle.vue';
import ProgressCircularCircleRange from './ProgressCircularCircleRange.vue';
import ProgressCircularCircleTrack from './ProgressCircularCircleTrack.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<ProgressCircleProps, 'asChild'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();

const attrs = useAttrs();
</script>

<template>
  <ProgressCircularCircle v-bind="attrs" :class="className">
    <ProgressCircularCircleTrack />
    <ProgressCircularCircleRange />
  </ProgressCircularCircle>
</template>