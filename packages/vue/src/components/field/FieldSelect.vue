<script setup lang="ts">
import { FieldSelect as ArkFieldSelect } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes, SelectHTMLAttributes } from 'vue';
import styles from './Field.module.css';

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
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldSelect
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(styles.control, className)"
    :default-value="defaultValue"
    :model-value="modelValue"
    data-slot="field-select"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </ArkFieldSelect>
</template>