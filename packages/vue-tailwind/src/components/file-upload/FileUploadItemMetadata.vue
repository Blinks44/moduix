<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import FileUploadItemSizeText from './FileUploadItemSizeText.vue';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
  file: File;
}
const { class: className, file } = defineProps<Props>();
const attrs = useAttrs();
const metadataClass =
  "col-start-1 flex items-center gap-1 text-xs leading-4 text-muted-foreground group-has-[[data-slot=file-upload-item-preview-image]]/item:row-start-3 group-has-[[data-slot=file-upload-item-preview]]/item:group-not-has-[[data-slot=file-upload-item-preview-image]]/item:col-start-2 [&>[data-slot='file-upload-item-size-text']::before]:me-1 [&>[data-slot='file-upload-item-size-text']::before]:content-['·']";
const getFileTypeLabel = (file: File) => {
  const extension = file.name.split('.').pop();
  return extension ? extension.toUpperCase() : file.type || 'FILE';
};
</script>
<template>
  <ark.div
    v-bind="attrs"
    :class="cn(metadataClass, className)"
    data-slot="file-upload-item-metadata"
    ><ark.span>{{ getFileTypeLabel(file) }}</ark.span
    ><FileUploadItemSizeText
  /></ark.div>
</template>