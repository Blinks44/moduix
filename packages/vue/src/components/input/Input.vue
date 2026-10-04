<script setup lang="ts">
import { FieldInput as ArkFieldInput } from '@ark-ui/vue/field';
import type { FieldInputProps } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Input.module.css';

defineOptions({ inheritAttrs: false });

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

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
</script>

<template>
  <ArkFieldInput
    v-bind="attrs"
    :class="clsx(styles.root, props.class)"
    :size="props.htmlSize"
    data-scope="field"
    data-part="input"
    data-slot="input-root"
    :data-size="props.size ?? 'md'"
    :data-html-size="props.htmlSize === undefined ? undefined : ''"
  >
    <slot />
  </ArkFieldInput>
</template>