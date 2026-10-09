<script setup lang="ts">
import { FileUploadDropzone as ArkFileUploadDropzone } from '@ark-ui/vue/file-upload';
import type { FileUploadDropzoneProps } from '@ark-ui/vue/file-upload';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FileUpload.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FileUploadDropzoneProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFileUploadDropzone
    v-bind="attrs"
    :class="clsx(styles.dropzone, className)"
    data-slot="file-upload-dropzone"
  >
    <slot />
  </ArkFileUploadDropzone>
</template>