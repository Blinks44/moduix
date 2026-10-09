<script setup lang="ts">
import { FileUploadItem as ArkFileUploadItem } from '@ark-ui/vue/file-upload';
import type { FileUploadItemProps } from '@ark-ui/vue/file-upload';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FileUpload.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FileUploadItemProps {
  class?: HTMLAttributes['class'];
  file: FileUploadItemProps['file'];
}

const { class: className, file } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFileUploadItem
    v-bind="attrs"
    :class="clsx(styles.item, className)"
    :file="file"
    data-slot="file-upload-item"
  >
    <slot />
  </ArkFileUploadItem>
</template>