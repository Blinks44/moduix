<script setup lang="ts">
import { ProgressView as ArkProgressView } from '@ark-ui/vue/progress';
import type { ProgressViewProps } from '@ark-ui/vue/progress';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
    :class="cn('contents', className)"
    :state="state"
    data-slot="progress-linear-view"
  >
    <slot />
  </ArkProgressView>
</template>