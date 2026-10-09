<script setup lang="ts">
import { EditableRoot as ArkEditableRoot } from '@ark-ui/vue/editable';
import type { EditableRootEmits, EditableRootProps } from '@ark-ui/vue/editable';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Editable.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableRootProps {
  activationMode?: EditableRootProps['activationMode'];
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ EditableRootEmits {}

const { activationMode = 'dblclick', class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkEditableRoot
    v-bind="attrs"
    :activation-mode="activationMode"
    :class="clsx(styles.root, className)"
    data-slot="editable-root"
  >
    <slot />
  </ArkEditableRoot>
</template>