<script setup lang="ts">
import { FieldTextarea as ArkFieldTextarea } from '@ark-ui/vue/field';
import { useAttrs } from 'vue';
import type { HTMLAttributes, TextareaHTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

type FieldTextareaValue = string | number | readonly string[] | undefined;

export interface Props extends /* @vue-ignore */ Omit<TextareaHTMLAttributes, 'value'> {
  class?: HTMLAttributes['class'];
  asChild?: boolean;
  autoresize?: boolean;
  modelValue?: FieldTextareaValue;
}

export interface Emits {
  'update:modelValue': [value: FieldTextareaValue];
}

const { asChild = false, autoresize = false, class: className, modelValue } = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldTextarea
    v-bind="attrs"
    :as-child="asChild"
    :autoresize="autoresize"
    :class="
      cn(
        'min-h-20 w-full resize-y rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none data-disabled:pointer-events-none data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        className,
      )
    "
    :model-value="modelValue"
    data-slot="field-textarea"
  >
    <slot />
  </ArkFieldTextarea>
</template>