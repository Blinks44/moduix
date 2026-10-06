<script setup lang="ts">
import { FieldInput as ArkFieldInput } from '@ark-ui/vue/field';
import type { FieldInputProps } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Field.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FieldInputProps {
  class?: HTMLAttributes['class'];
}

export interface Emits {
  'update:modelValue': [value: FieldInputProps['modelValue']];
}

const props = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldInput
    v-bind="attrs"
    :class="clsx(styles.control, styles.input, props.class)"
    data-slot="field-input"
  >
    <slot />
  </ArkFieldInput>
</template>