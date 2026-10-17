<script setup lang="ts">
import type { FieldTextareaProps } from '@ark-ui/vue/field';
import type { HTMLAttributes } from 'vue';
import { useAttrs } from 'vue';
import { cn } from '@/lib/moduix/cn';
import Textarea from '../textarea/Textarea.vue';
import { useInputGroupSize } from './context';
import { inputGroupTextareaVariants } from './variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<FieldTextareaProps, 'class'> {
  class?: HTMLAttributes['class'];
}

export interface Emits {
  'update:modelValue': [value: FieldTextareaProps['modelValue']];
}

const props = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

// Narrowed because reading the full Field textarea props type hits TS2590 (union too complex).
const textareaProps = props as Pick<Props, 'class'>;

const attrs = useAttrs();
const groupSize = useInputGroupSize();
</script>

<template>
  <Textarea
    v-bind="attrs"
    :class="cn(inputGroupTextareaVariants({ size: groupSize }), textareaProps.class)"
  >
    <slot />
  </Textarea>
</template>