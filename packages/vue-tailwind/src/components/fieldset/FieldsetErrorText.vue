<script setup lang="ts">
import { FieldsetErrorText as ArkFieldsetErrorText } from '@ark-ui/vue/fieldset';
import type { FieldsetErrorTextProps } from '@ark-ui/vue/fieldset';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FieldsetErrorTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldsetErrorText
    v-bind="attrs"
    :class="cn('text-sm font-medium wrap-anywhere text-destructive', className)"
    data-slot="fieldset-error-text"
  >
    <slot />
  </ArkFieldsetErrorText>
</template>