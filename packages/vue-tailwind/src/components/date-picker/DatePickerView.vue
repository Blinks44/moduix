<script setup lang="ts">
import { DatePickerView as ArkDatePickerView } from '@ark-ui/vue/date-picker';
import type { DatePickerViewProps } from '@ark-ui/vue/date-picker';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerViewProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const view = computed(() => props.view ?? (attrs.view as DatePickerViewProps['view']));
</script>

<template>
  <ArkDatePickerView
    v-bind="attrs"
    :view="view"
    :class="cn('grid gap-3', props.class)"
    data-slot="date-picker-view"
  >
    <slot />
  </ArkDatePickerView>
</template>