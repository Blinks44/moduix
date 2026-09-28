<script setup lang="ts">
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes, SVGAttributes } from 'vue';
import { FileIcon } from '@/internal/icons/ui/Icons';
import styles from './FileUpload.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SVGAttributes {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <FileIcon
    v-bind="attrs"
    :class="clsx(styles.itemPreviewIcon, className)"
    data-slot="file-upload-item-preview-icon"
  />
</template>