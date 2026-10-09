<script setup lang="ts">
import { DatePickerViewControl as ArkDatePickerViewControl } from '@ark-ui/vue/date-picker';
import type { DatePickerViewControlProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerViewControlProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerViewControl
    v-bind="attrs"
    :class="cn('flex min-w-0 items-center justify-between gap-2', props.class)"
    data-slot="date-picker-view-control"
  >
    <slot />
  </ArkDatePickerViewControl>
</template>