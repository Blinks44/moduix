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
const isList = computed(() => props.multiple || Number(props.size) > 1);
const controlAttrs = computed(() => {
  const { class: _class, ...rest } = props.controlProps ?? {};
  return rest;
});
const selectClass =
  'peer/native-select h-control-md w-56 max-w-full min-w-0 cursor-pointer appearance-none rounded-md border border-border bg-background ps-3.5 pe-[2.875rem] text-foreground outline-focus-inset outline-offset-focus-inset outline-transparent transition-[border-color,outline-color,opacity] duration-normal ease-in-out [font:inherit] focus-visible:border-ring focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-disabled aria-invalid:border-destructive aria-invalid:outline-destructive data-disabled:pointer-events-none data-disabled:opacity-disabled data-invalid:border-destructive data-invalid:outline-destructive forced-colors:appearance-auto forced-colors:pe-3.5';
const indicatorClass =
  'pointer-events-none absolute end-2 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-[background-color,color,opacity] duration-normal ease-in-out peer-hover/native-select:bg-muted peer-hover/native-select:text-foreground peer-disabled/native-select:opacity-disabled peer-data-disabled/native-select:opacity-disabled forced-colors:hidden [&>svg]:size-4';
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
      :class="cn(selectClass, isList && 'h-auto appearance-auto px-3.5 py-2', props.class)"
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