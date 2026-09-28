<script setup lang="ts">
import { FileUploadItem as ArkFileUploadItem } from '@ark-ui/vue/file-upload';
import type { FileUploadItemProps } from '@ark-ui/vue/file-upload';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ FileUploadItemProps {
  class?: HTMLAttributes['class'];
  file: FileUploadItemProps['file'];
}
const { class: className, file } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const itemClass =
  'group/item box-border grid min-h-control-md shrink-0 grow basis-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 rounded-md border border-border bg-background px-3 py-2 text-foreground has-[[data-slot=file-upload-item-preview-image]]:min-h-0 has-[[data-slot=file-upload-item-preview-image]]:max-w-40 has-[[data-slot=file-upload-item-preview-image]]:grow-0 has-[[data-slot=file-upload-item-preview-image]]:grid-cols-[minmax(0,1fr)_auto] has-[[data-slot=file-upload-item-preview-image]]:grid-rows-[auto_auto_auto] has-[[data-slot=file-upload-item-preview-image]]:items-start has-[[data-slot=file-upload-item-preview]]:min-h-control-xl has-[[data-slot=file-upload-item-preview]]:grid-cols-[auto_minmax(0,1fr)_auto] has-[[data-slot=file-upload-item-preview]]:py-2 data-disabled:opacity-50 data-[type=rejected]:border-destructive';
</script>
<template>
  <ArkFileUploadItem
    v-bind="attrs"
    :class="cn(itemClass, className)"
    :file="file"
    data-slot="file-upload-item"
    ><slot
  /></ArkFileUploadItem>
</template>