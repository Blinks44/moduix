<script setup lang="ts">
import type { FieldTextareaProps } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import Textarea from '../textarea/Textarea.vue';
import { useInputGroupSize, type InputGroupSize } from './context';
import styles from './InputGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<FieldTextareaProps, 'class'> {
  class?: HTMLAttributes['class'];
  size?: InputGroupSize;
}

export interface Emits {
  'update:modelValue': [value: FieldTextareaProps['modelValue']];
}

const props = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

// Narrowed because reading the full Field textarea props type hits TS2590 (union too complex).
const textareaProps = props as Pick<Props, 'class' | 'size'>;

const attrs = useAttrs();
const groupSize = useInputGroupSize();
const textareaSize = computed(() => textareaProps.size ?? groupSize.value);
</script>

<template>
  <Textarea v-bind="attrs" :class="clsx(styles.textarea, textareaProps.class)" :size="textareaSize">
    <slot />
  </Textarea>
</template>