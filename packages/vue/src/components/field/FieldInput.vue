<script setup lang="ts">
import { FieldInput as ArkFieldInput } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, InputHTMLAttributes } from 'vue';
import styles from './Field.module.css';

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
const forwardedProps = computed(() =>
  Object.fromEntries(
    Object.entries(props as Record<string, unknown>).filter(([, value]) => value !== undefined),
  ),
);
</script>

<template>
  <ArkFieldInput
    v-bind="{ ...attrs, ...forwardedProps }"
    :class="clsx(styles.control, props.class)"
    data-slot="field-input"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </ArkFieldInput>
</template>