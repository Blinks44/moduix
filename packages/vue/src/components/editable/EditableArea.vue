<script setup lang="ts">
import { EditableArea as ArkEditableArea } from '@ark-ui/vue/editable';
import type { EditableAreaProps } from '@ark-ui/vue/editable';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Editable.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableAreaProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkEditableArea v-bind="attrs" :class="clsx(styles.area, className)" data-slot="editable-area">
    <slot />
  </ArkEditableArea>
</template>