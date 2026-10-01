<script setup lang="ts">
import { ToggleIndicator as ArkToggleIndicator } from '@ark-ui/vue/toggle';
import type { ToggleIndicatorProps } from '@ark-ui/vue/toggle';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ToggleIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{
  default?: () => unknown;
  fallback?: () => unknown;
}>();

const attrs = useAttrs();
</script>

<template>
  <ArkToggleIndicator
    v-bind="attrs"
    :class="
      cn(
        'inline-flex items-center justify-center text-inherit [&>svg]:block [&>svg]:size-4 [&>svg]:shrink-0',
        className,
      )
    "
    data-slot="toggle-indicator"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-if="$slots.fallback" #fallback>
      <slot name="fallback" />
    </template>
  </ArkToggleIndicator>
</template>