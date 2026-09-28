<script setup lang="ts">
import { FileUploadItemPreviewImage as ArkFileUploadItemPreviewImage } from '@ark-ui/vue/file-upload';
import type { FileUploadItemPreviewImageProps } from '@ark-ui/vue/file-upload';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ FileUploadItemPreviewImageProps {
  class?: HTMLAttributes['class'];
}
const { class: className } = defineProps<Props>();
const attrs = useAttrs();
</script>
<template>
  <ArkFileUploadItemPreviewImage
    v-bind="attrs"
    :class="cn('size-full object-cover', className)"
    data-slot="file-upload-item-preview-image"
  />
</template>