<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FileUpload.module.css';
import FileUploadItemSizeText from './FileUploadItemSizeText.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
  file: File;
}

const { class: className, file } = defineProps<Props>();
const attrs = useAttrs();

const getFileTypeLabel = (file: File) => {
  const extension = file.name.split('.').pop();
  return extension ? extension.toUpperCase() : file.type || 'FILE';
};
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="clsx(styles.itemMetadata, className)"
    data-slot="file-upload-item-metadata"
  >
    <ark.span>{{ getFileTypeLabel(file) }}</ark.span>
    <FileUploadItemSizeText />
  </ark.div>
</template>