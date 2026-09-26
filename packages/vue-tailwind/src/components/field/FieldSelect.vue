<script setup lang="ts">
import { FieldSelect as ArkFieldSelect } from '@ark-ui/vue/field';
import { computed, useAttrs } from 'vue';
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

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedProps = computed(() =>
  Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined)),
);
</script>

<template>
  <ArkFieldSelect
    v-bind="{ ...attrs, ...forwardedProps }"
    :class="
      cn(
        'min-h-control-md w-full rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out focus-visible:outline-ring disabled:pointer-events-none data-disabled:pointer-events-none data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        props.class,
      )
    "
    data-slot="field-select"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </ArkFieldSelect>
</template>