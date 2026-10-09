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
    :class="
      cn('min-w-0 text-sm leading-5 font-normal [overflow-wrap:anywhere] text-current', className)
    "
    data-slot="progress-linear-label"
  >
    <slot />
  </ArkProgressLabel>
</template>