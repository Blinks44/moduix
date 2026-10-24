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
</script>

<template>
  <ArkDatePickerInput
    v-bind="attrs"
    :class="
      cn(
        `h-control-md w-full min-w-30 flex-1 rounded-md border border-border bg-background py-1 ps-3.5 pe-17 text-md leading-6 text-current outline-focus-inset outline-offset-focus-inset outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out group-has-[input[data-index='1']]/date-picker:pe-3.5 placeholder:text-muted-foreground read-only:cursor-default focus:border-ring focus:outline-ring disabled:cursor-default data-invalid:border-destructive data-invalid:outline-destructive data-[index='1']:pe-17`,
        props.class,
      )
    "
    data-slot="date-picker-input"
  >
    <slot />
  </ArkDatePickerInput>
</template>