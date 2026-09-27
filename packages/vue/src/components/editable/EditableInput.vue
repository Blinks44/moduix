<script setup lang="ts">
import { EditableInput as ArkEditableInput } from '@ark-ui/vue/editable';
import type { EditableInputProps } from '@ark-ui/vue/editable';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Editable.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableInputProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkEditableInput
    v-bind="attrs"
    :class="clsx(styles.input, props.class)"
    data-slot="editable-input"
  >
    <slot />
  </ArkEditableInput>
</template>