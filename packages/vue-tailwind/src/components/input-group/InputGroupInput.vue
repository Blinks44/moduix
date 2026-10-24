<script setup lang="ts">
import type { FieldInputProps } from '@ark-ui/vue/field';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import Input from '../input/Input.vue';
import { useInputGroupSize, type InputGroupSize } from './context';
import { inputGroupInputVariants } from './variants';

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

// Narrowed because reading the full Field input props type hits TS2590 (union too complex).
const inputProps = props as Pick<Props, 'class' | 'htmlSize' | 'size'>;

const attrs = useAttrs();
const groupSize = useInputGroupSize();
const inputSize = computed(() => inputProps.size ?? groupSize.value);
</script>

<template>
  <Input
    v-bind="attrs"
    :class="cn(inputGroupInputVariants({ size: inputSize }), inputProps.class)"
    :html-size="inputProps.htmlSize"
    :size="inputSize"
  >
    <slot />
  </Input>
</template>