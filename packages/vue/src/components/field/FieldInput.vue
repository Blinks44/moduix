<script setup lang="ts">
import { FieldInput as ArkFieldInput } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
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
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldInput
    v-bind="attrs"
    :as-child="props.asChild ?? false"
    :class="clsx(styles.control, styles.input, props.class)"
    :default-value="props.defaultValue"
    :model-value="props.modelValue"
    data-slot="field-input"
  >
    <slot />
  </ArkFieldInput>
</template>