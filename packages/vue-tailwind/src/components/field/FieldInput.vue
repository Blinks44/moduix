<script setup lang="ts">
import { FieldInput as ArkFieldInput } from '@ark-ui/vue/field';
import { useAttrs } from 'vue';
import type { HTMLAttributes, InputHTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

type FieldInputValue = string | number | readonly string[] | undefined;

export interface Props extends /* @vue-ignore */ Omit<InputHTMLAttributes, 'value'> {
  class?: HTMLAttributes['class'];
  asChild?: boolean;
  defaultValue?: FieldInputValue;
  modelValue?: FieldInputValue;
}

export interface Emits {
  'update:modelValue': [value: FieldInputValue];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldInput
    v-bind="attrs"
    :as-child="props.asChild ?? false"
    :class="
      cn(
        'min-h-control-md w-full rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none data-disabled:pointer-events-none data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        props.class,
      )
    "
    :default-value="props.defaultValue"
    :model-value="props.modelValue"
    data-slot="field-input"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </ArkFieldInput>
</template>