<script setup lang="ts">
import { FieldTextarea as ArkFieldTextarea } from '@ark-ui/vue/field';
import { computed, useAttrs } from 'vue';
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

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedProps = computed(() =>
  Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined)),
);
</script>

<template>
  <ArkFieldTextarea
    v-bind="{ ...attrs, ...forwardedProps }"
    :class="
      cn(
        'min-h-20 w-full resize-y rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none data-disabled:pointer-events-none data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        props.class,
      )
    "
    data-slot="field-textarea"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </ArkFieldTextarea>
</template>