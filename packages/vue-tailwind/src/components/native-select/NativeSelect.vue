<script setup lang="ts">
import { FieldSelect as ArkFieldSelect } from '@ark-ui/vue/field';
import type { FieldSelectProps } from '@ark-ui/vue/field';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FieldSelectProps {
  class?: HTMLAttributes['class'];
  controlProps?: HTMLAttributes;
  multiple?: FieldSelectProps['multiple'];
  size?: FieldSelectProps['size'];
}

export interface Emits {
  'update:modelValue': [value: FieldSelectProps['modelValue']];
}

const props = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
const isList = computed(
  () => props.multiple || (props.size !== undefined && Number(props.size) > 1),
);
const controlAttrs = computed(() => {
  const { class: _class, ...rest } = props.controlProps ?? {};
  return rest;
});
const selectClass =
  'peer/native-select box-border h-control-md w-56 max-w-full min-w-0 cursor-pointer appearance-none rounded-md border border-border bg-background ps-3 pe-11 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color,opacity] duration-200 ease-in-out [font:inherit] focus-visible:border-ring focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:outline-destructive aria-invalid:focus-visible:outline-destructive data-disabled:pointer-events-none data-disabled:opacity-50 data-invalid:border-destructive data-invalid:outline-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none forced-colors:appearance-auto forced-colors:pe-3';
const indicatorClass =
  'pointer-events-none absolute end-2 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-sm bg-transparent leading-none text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out peer-disabled/native-select:opacity-50 peer-data-disabled/native-select:opacity-50 motion-reduce:transition-none forced-colors:hidden [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:peer-[:not([disabled]):not([data-disabled]):hover]/native-select:bg-muted [@media(hover:hover)]:peer-[:not([disabled]):not([data-disabled]):hover]/native-select:text-foreground';
</script>

<template>
  <span
    v-bind="controlAttrs"
    :class="cn('relative inline-grid w-fit max-w-full min-w-0', props.controlProps?.class)"
    data-scope="native-select"
    data-part="control"
    data-slot="native-select-control"
  >
    <ArkFieldSelect
      :ref="forwardRef"
      v-bind="attrs"
      :multiple="props.multiple"
      :size="props.size"
      :class="cn(selectClass, isList && 'h-auto appearance-auto px-3 py-2', props.class)"
      data-scope="field"
      data-part="select"
      data-slot="native-select-root"
    >
      <slot />
    </ArkFieldSelect>
    <span
      aria-hidden="true"
      data-scope="native-select"
      data-part="indicator"
      data-slot="native-select-indicator"
      :class="cn(indicatorClass, isList && 'hidden')"
    >
      <ChevronDownIcon />
    </span>
  </span>
</template>