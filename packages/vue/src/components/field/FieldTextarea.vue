<script setup lang="ts">
import { FieldTextarea as ArkFieldTextarea } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, TextareaHTMLAttributes } from 'vue';
import styles from './Field.module.css';

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
    :class="clsx(styles.control, styles.textarea, props.class)"
    data-slot="field-textarea"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </ArkFieldTextarea>
</template>