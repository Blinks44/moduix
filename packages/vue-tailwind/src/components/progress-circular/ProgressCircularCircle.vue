<script setup lang="ts">
import { ProgressCircle as ArkProgressCircle } from '@ark-ui/vue/progress';
import type { ProgressCircleProps } from '@ark-ui/vue/progress';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressCircleProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressCircle
    v-bind="attrs"
    :class="
      cn(
        'block overflow-visible [--size:var(--spacing-control-xl)] [--thickness:0.4rem]',
        className,
      )
    "
    data-slot="progress-circular-circle"
  >
    <slot />
  </ArkProgressCircle>
</template>