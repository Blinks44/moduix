<script setup lang="ts">
import { FieldHelperText as ArkFieldHelperText } from '@ark-ui/vue/field';
import type { FieldHelperTextProps as ArkFieldHelperTextProps } from '@ark-ui/vue/field';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkFieldHelperTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldHelperText
    v-bind="attrs"
    :class="cn('text-sm leading-5 wrap-anywhere text-muted-foreground', className)"
    data-slot="field-helper-text"
  >
    <slot />
  </ArkFieldHelperText>
</template>