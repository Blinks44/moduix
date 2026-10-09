<script setup lang="ts">
import { FieldLabel as ArkFieldLabel } from '@ark-ui/vue/field';
import type { FieldLabelProps as ArkFieldLabelProps } from '@ark-ui/vue/field';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkFieldLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldLabel
    v-bind="attrs"
    :class="
      cn(
        'inline-flex items-center gap-2 text-sm leading-5 font-medium wrap-anywhere text-foreground',
        className,
      )
    "
    data-slot="field-label"
  >
    <slot />
  </ArkFieldLabel>
</template>