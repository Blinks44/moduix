<script setup lang="ts">
import { FieldTextarea as ArkFieldTextarea } from '@ark-ui/vue/field';
import type { FieldTextareaProps } from '@ark-ui/vue/field';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Textarea.module.css';

defineOptions({ inheritAttrs: false });

export type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ FieldTextareaProps {
  class?: HTMLAttributes['class'];
  size?: TextareaSize;
}

export interface Emits {
  'update:modelValue': [value: FieldTextareaProps['modelValue']];
}

const props = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFieldTextarea
    v-bind="attrs"
    :class="clsx(styles.root, props.class)"
    data-scope="field"
    data-part="textarea"
    data-slot="textarea-root"
    :data-size="props.size ?? 'md'"
  >
    <slot />
  </ArkFieldTextarea>
</template>