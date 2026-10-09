<script setup lang="ts">
import { DatePickerInput as ArkDatePickerInput } from '@ark-ui/vue/date-picker';
import type { DatePickerInputProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerInputProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const inputClasses =
  'read-only:cursor-default h-control-md w-full min-w-30 flex-1 rounded-md border border-border bg-background ps-3.5 pe-17 text-md leading-6 text-current outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,color,outline-color,opacity] duration-200 ease-in-out group-has-[input[data-index="1"]]/date-picker:pe-3.5 group-data-focus/date-picker-control:border-ring group-data-focus/date-picker-control:outline-ring placeholder:text-muted-foreground focus:border-ring focus:outline-ring disabled:cursor-default aria-invalid:border-destructive aria-invalid:outline-destructive data-disabled:cursor-default data-invalid:border-destructive data-invalid:outline-destructive data-readonly:cursor-default data-[index="1"]:pe-17 motion-reduce:transition-none';
</script>

<template>
  <ArkDatePickerInput
    v-bind="attrs"
    :class="cn(inputClasses, 'py-1', props.class)"
    data-slot="date-picker-input"
  >
    <slot />
  </ArkDatePickerInput>
</template>