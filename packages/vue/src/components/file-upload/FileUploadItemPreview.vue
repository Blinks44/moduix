<script setup lang="ts">
import { FileUploadItemPreview as ArkFileUploadItemPreview } from '@ark-ui/vue/file-upload';
import type { FileUploadItemPreviewProps } from '@ark-ui/vue/file-upload';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FileUpload.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FileUploadItemPreviewProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFileUploadItemPreview
    v-bind="attrs"
    :class="clsx(styles.itemPreview, className)"
    data-slot="file-upload-item-preview"
  >
    <slot />
  </ArkFileUploadItemPreview>
</template>