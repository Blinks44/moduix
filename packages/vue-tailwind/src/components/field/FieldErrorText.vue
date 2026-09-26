<script setup lang="ts">
import { FieldErrorText as ArkFieldErrorText } from '@ark-ui/vue/field';
import type { FieldErrorTextProps as ArkFieldErrorTextProps } from '@ark-ui/vue/field';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkFieldErrorTextProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedProps = computed(() =>
  Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined)),
);
</script>

<template>
  <ArkFieldErrorText
    v-bind="{ ...attrs, ...forwardedProps }"
    :class="cn('text-sm leading-5 font-medium wrap-anywhere text-destructive', props.class)"
    data-slot="field-error-text"
  >
    <slot />
  </ArkFieldErrorText>
</template>