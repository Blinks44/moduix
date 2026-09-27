<script setup lang="ts">
import { RadioGroupLabel as ArkRadioGroupLabel } from '@ark-ui/vue/radio-group';
import type { RadioGroupLabelProps } from '@ark-ui/vue/radio-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RadioGroupLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRadioGroupLabel
    v-bind="attrs"
    :class="cn('text-sm leading-5 font-semibold text-inherit', className)"
    data-slot="radio-group-label"
  >
    <slot />
  </ArkRadioGroupLabel>
</template>