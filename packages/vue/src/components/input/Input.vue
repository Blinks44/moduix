<script setup lang="ts">
import { FieldInput as ArkFieldInput } from '@ark-ui/vue/field';
import type { FieldInputProps } from '@ark-ui/vue/field';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Input.module.css';

defineOptions({ inheritAttrs: false });

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ Omit<FieldInputProps, 'size'> {
  class?: HTMLAttributes['class'];
  htmlSize?: FieldInputProps['size'];
  size?: InputSize;
}

export interface Emits {
  'update:modelValue': [value: FieldInputProps['modelValue']];
}

const props = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <ArkFieldInput
    :ref="forwardRef"
    v-bind="attrs"
    :class="clsx(styles.root, props.class)"
    :size="props.htmlSize"
    data-scope="field"
    data-part="input"
    :data-slot="attrs['data-slot'] ?? 'input-root'"
    :data-size="props.size ?? 'md'"
  >
    <slot />
  </ArkFieldInput>
</template>