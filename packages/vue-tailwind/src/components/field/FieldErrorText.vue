<script setup lang="ts">
import { FieldErrorText as ArkFieldErrorText } from '@ark-ui/vue/field';
import type { FieldErrorTextProps as ArkFieldErrorTextProps } from '@ark-ui/vue/field';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkFieldErrorTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldErrorText
    v-bind="attrs"
    :class="cn('text-sm leading-5 font-medium wrap-anywhere text-destructive', className)"
    data-slot="field-error-text"
  >
    <slot />
  </ArkFieldErrorText>
</template>