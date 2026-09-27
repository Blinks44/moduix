<script setup lang="ts">
import { DatePickerRangeText as ArkDatePickerRangeText } from '@ark-ui/vue/date-picker';
import type { DatePickerRangeTextProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerRangeTextProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerRangeText
    v-bind="attrs"
    :class="cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', props.class)"
    data-slot="date-picker-range-text"
  >
    <slot />
  </ArkDatePickerRangeText>
</template>