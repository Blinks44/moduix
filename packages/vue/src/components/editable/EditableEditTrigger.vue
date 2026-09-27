<script setup lang="ts">
import { EditableEditTrigger as ArkEditableEditTrigger } from '@ark-ui/vue/editable';
import type { EditableEditTriggerProps } from '@ark-ui/vue/editable';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { PencilIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Editable.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableEditTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkEditableEditTrigger
    v-bind="attrs"
    :class="clsx(styles.trigger, className)"
    data-slot="editable-edit-trigger"
  >
    <slot><PencilIcon /></slot>
  </ArkEditableEditTrigger>
</template>