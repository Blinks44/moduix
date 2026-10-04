<script setup lang="ts">
import { FieldSelect as ArkFieldSelect } from '@ark-ui/vue/field';
import { useAttrs } from 'vue';
import type { HTMLAttributes, SelectHTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

type FieldSelectValue = string | undefined;

export interface Props extends /* @vue-ignore */ Omit<SelectHTMLAttributes, 'value'> {
  class?: HTMLAttributes['class'];
  asChild?: boolean;
  defaultValue?: FieldSelectValue;
  modelValue?: FieldSelectValue;
}

export interface Emits {
  'update:modelValue': [value: FieldSelectValue];
}

const { asChild = false, class: className, defaultValue, modelValue } = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldSelect
    v-bind="attrs"
    :as-child="asChild"
    :class="
      cn(
        'min-h-control-md w-full rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out focus-visible:outline-ring disabled:pointer-events-none data-disabled:pointer-events-none data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        className,
      )
    "
    :default-value="defaultValue"
    :model-value="modelValue"
    data-slot="field-select"
  >
    <slot />
  </ArkFieldSelect>
</template>