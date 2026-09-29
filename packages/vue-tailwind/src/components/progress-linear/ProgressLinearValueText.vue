<script setup lang="ts">
import { ProgressValueText as ArkProgressValueText } from '@ark-ui/vue/progress';
import type { ProgressValueTextProps } from '@ark-ui/vue/progress';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressValueTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressValueText
    v-if="$slots.default"
    v-bind="attrs"
    :class="
      cn(
        'min-w-0 justify-self-end text-end text-sm leading-5 font-normal [overflow-wrap:anywhere] text-current',
        className,
      )
    "
    data-slot="progress-linear-value-text"
  >
    <slot />
  </ArkProgressValueText>
  <ArkProgressValueText
    v-else
    v-bind="attrs"
    :class="
      cn(
        'min-w-0 justify-self-end text-end text-sm leading-5 font-normal [overflow-wrap:anywhere] text-current',
        className,
      )
    "
    data-slot="progress-linear-value-text"
  />
</template>