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
        `h-control-md w-full min-w-30 flex-1 rounded-md border border-input bg-background py-1 ps-3.5 pe-17 text-md leading-6 text-current outline-focus-halo outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out group-has-[input[data-index='1']]/date-picker:not-data-[index='1']:pe-3.5 placeholder:text-muted-foreground read-only:cursor-default focus:border-ring focus:outline-ring/50 disabled:cursor-default data-invalid:border-destructive data-invalid:focus:outline-destructive/20`,
        props.class,
      )
    "
    data-slot="date-picker-input"
  >
    <slot />
  </ArkDatePickerInput>
</template>