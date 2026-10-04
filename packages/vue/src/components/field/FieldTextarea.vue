<script setup lang="ts">
import { FieldTextarea as ArkFieldTextarea } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
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
    :class="clsx(styles.control, styles.textarea, className)"
    :model-value="modelValue"
    data-slot="field-textarea"
  >
    <slot />
  </ArkFieldTextarea>
</template>