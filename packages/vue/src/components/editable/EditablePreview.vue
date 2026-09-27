<script setup lang="ts">
import { EditablePreview as ArkEditablePreview } from '@ark-ui/vue/editable';
import type { EditablePreviewProps } from '@ark-ui/vue/editable';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Editable.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditablePreviewProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkEditablePreview
    v-bind="attrs"
    :class="clsx(styles.preview, className)"
    data-slot="editable-preview"
  >
    <slot />
  </ArkEditablePreview>
</template>