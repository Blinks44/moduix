<script setup lang="ts">
import { FieldsetHelperText as ArkFieldsetHelperText } from '@ark-ui/vue/fieldset';
import type { FieldsetHelperTextProps } from '@ark-ui/vue/fieldset';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FieldsetHelperTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldsetHelperText
    v-bind="attrs"
    :class="cn('text-sm wrap-anywhere text-muted-foreground', className)"
    data-slot="fieldset-helper-text"
  >
    <slot />
  </ArkFieldsetHelperText>
</template>