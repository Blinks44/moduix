<script setup lang="ts">
import { EditableControl as ArkEditableControl } from '@ark-ui/vue/editable';
import type { EditableControlProps } from '@ark-ui/vue/editable';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Editable.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkEditableControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="editable-control"
  >
    <slot />
  </ArkEditableControl>
</template>