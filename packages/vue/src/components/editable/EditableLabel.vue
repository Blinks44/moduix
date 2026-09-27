<script setup lang="ts">
import { EditableLabel as ArkEditableLabel } from '@ark-ui/vue/editable';
import type { EditableLabelProps } from '@ark-ui/vue/editable';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Editable.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkEditableLabel
    v-bind="attrs"
    :class="clsx(styles.label, className)"
    data-slot="editable-label"
  >
    <slot />
  </ArkEditableLabel>
</template>