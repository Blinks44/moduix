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
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldInput
    v-bind="attrs"
    :as-child="props.asChild ?? false"
    :class="
      cn(
        'min-h-control-md w-full max-w-none rounded-md border border-border bg-background px-3 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out file:me-3 file:cursor-pointer file:rounded-md file:border file:border-primary file:bg-primary file:px-2 file:py-0.5 file:font-medium file:text-primary-foreground file:transition-colors file:duration-200 file:ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive data-disabled:pointer-events-none data-disabled:opacity-50 data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none [:is([data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100 [@media(hover:hover)]:file:hover:bg-foreground [[data-slot=field-root-provider][data-disabled]_&]:opacity-100 [[data-slot=field-root][data-disabled]_&]:opacity-100 [[data-slot=input-group-root]:has([data-slot=input-root]:is([data-disabled],:disabled))_&]:opacity-100',
        props.class,
      )
    "
    :default-value="props.defaultValue"
    :model-value="props.modelValue"
    data-slot="field-input"
  >
    <slot />
  </ArkFieldInput>
</template>