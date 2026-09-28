<script setup lang="ts">
import type { FieldInputProps } from '@ark-ui/vue/field';
import { computed, inject, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import Input from '../input/Input.vue';
import { defaultInputGroupSize, InputGroupSizeContextKey } from './context';
import type { InputGroupSize } from './context';
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
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

interface InputGroupInputBindings {
  class?: HTMLAttributes['class'];
  htmlSize?: FieldInputProps['size'];
  modelValue?: FieldInputProps['modelValue'];
  size?: InputGroupSize;
}

const inputProps = props as unknown as InputGroupInputBindings;

const attrs = useAttrs();
const modelValue = computed(() => inputProps.modelValue ?? attrs.modelValue);
const groupSize = inject(
  InputGroupSizeContextKey,
  computed(() => defaultInputGroupSize),
);
const inputSize = computed<InputGroupSize>(() => {
  const localSize: InputGroupSize | undefined = inputProps.size;
  return localSize ?? groupSize.value;
});
</script>

<template>
  <Input
    v-bind="attrs"
    :class="cn(inputGroupInputVariants({ size: inputSize }), inputProps.class)"
    :html-size="inputProps.htmlSize"
    :model-value="modelValue"
    :size="inputSize"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </Input>
</template>