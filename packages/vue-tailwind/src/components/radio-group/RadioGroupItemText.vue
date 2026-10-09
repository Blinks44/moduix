<script setup lang="ts">
import { RadioGroupItemText as ArkRadioGroupItemText } from '@ark-ui/vue/radio-group';
import type { RadioGroupItemTextProps } from '@ark-ui/vue/radio-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RadioGroupItemTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRadioGroupItemText
    v-bind="attrs"
    :class="cn('text-sm leading-5 font-medium text-inherit', className)"
    data-slot="radio-group-item-text"
  >
    <slot />
  </ArkRadioGroupItemText>
</template>