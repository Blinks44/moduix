<script setup lang="ts">
import { FieldTextarea as ArkFieldTextarea } from '@ark-ui/vue/field';
import type { FieldTextareaProps } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Field.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FieldTextareaProps {
  class?: HTMLAttributes['class'];
}

export interface Emits {
  'update:modelValue': [value: FieldTextareaProps['modelValue']];
}

const { class: className } = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldTextarea
    v-bind="attrs"
    :class="clsx(styles.control, styles.textarea, className)"
    data-slot="field-textarea"
  >
    <slot />
  </ArkFieldTextarea>
</template>