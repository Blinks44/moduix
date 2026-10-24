<script setup lang="ts">
import { ProgressView as ArkProgressView } from '@ark-ui/vue/progress';
import type { ProgressViewProps } from '@ark-ui/vue/progress';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressViewProps {
  state: ProgressViewProps['state'];
}

const { state } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressView v-bind="attrs" :state="state" data-slot="progress-linear-view">
    <slot />
  </ArkProgressView>
</template>