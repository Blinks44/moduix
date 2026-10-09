<script setup lang="ts">
import { ProgressLabel as ArkProgressLabel } from '@ark-ui/vue/progress';
import type { ProgressLabelProps } from '@ark-ui/vue/progress';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressLabel
    v-bind="attrs"
    :class="cn('max-w-full min-w-0 text-center text-sm font-regular wrap-anywhere', className)"
    data-slot="progress-circular-label"
  >
    <slot />
  </ArkProgressLabel>
</template>