<script setup lang="ts">
import type { FieldInputProps } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { computed, inject, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import Input from '../input/Input.vue';
import { defaultInputGroupSize, InputGroupSizeContextKey } from './context';
import type { InputGroupSize } from './context';
import styles from './InputGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<FieldInputProps, 'size'> {
  class?: HTMLAttributes['class'];
  htmlSize?: FieldInputProps['size'];
  size?: InputGroupSize;
}

export interface Emits {
  'update:modelValue': [value: FieldInputProps['modelValue']];
}

const props = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const inputProps = props as unknown as Pick<Props, 'class' | 'htmlSize' | 'size'>;

const attrs = useAttrs();
const groupSize = inject(
  InputGroupSizeContextKey,
  computed(() => defaultInputGroupSize),
);
const inputSize = computed(() => inputProps.size ?? groupSize.value);
</script>

<template>
  <Input
    v-bind="attrs"
    :class="clsx(styles.input, inputProps.class)"
    :html-size="inputProps.htmlSize"
    :size="inputSize"
  >
    <slot />
  </Input>
</template>