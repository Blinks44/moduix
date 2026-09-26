<script setup lang="ts">
import { FieldRequiredIndicator as ArkFieldRequiredIndicator } from '@ark-ui/vue/field';
import type { FieldRequiredIndicatorProps as ArkFieldRequiredIndicatorProps } from '@ark-ui/vue/field';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkFieldRequiredIndicatorProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown; fallback?: () => unknown }>();

const attrs = useAttrs();
const forwardedProps = computed(() =>
  Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined)),
);
</script>

<template>
  <ArkFieldRequiredIndicator
    v-bind="{ ...attrs, ...forwardedProps }"
    :class="cn('text-destructive', props.class)"
    data-slot="field-required-indicator"
  >
    <slot>*</slot>
    <template v-if="$slots.fallback" #fallback><slot name="fallback" /></template>
  </ArkFieldRequiredIndicator>
</template>