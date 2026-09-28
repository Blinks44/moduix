<script setup lang="ts">
import { FileUploadLabel as ArkFileUploadLabel } from '@ark-ui/vue/file-upload';
import type { FileUploadLabelProps } from '@ark-ui/vue/file-upload';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FileUpload.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FileUploadLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFileUploadLabel
    v-bind="attrs"
    :class="clsx(styles.label, className)"
    data-slot="file-upload-label"
  >
    <slot />
  </ArkFileUploadLabel>
</template>