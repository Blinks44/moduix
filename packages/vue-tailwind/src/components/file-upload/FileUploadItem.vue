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
  "group/item box-border grid min-h-control-md shrink-0 grow basis-full grid-cols-[minmax(0,1fr)_auto] content-center items-center gap-x-3 rounded-md border border-border bg-background px-3 py-2 [grid-template-areas:'name_delete'_'meta_delete'] data-[type=rejected]:border-destructive has-[[data-slot=file-upload-item-preview]]:not-has-[[data-slot=file-upload-item-preview-image]]:min-h-control-xl has-[[data-slot=file-upload-item-preview]]:not-has-[[data-slot=file-upload-item-preview-image]]:grid-cols-[auto_minmax(0,1fr)_auto] has-[[data-slot=file-upload-item-preview]]:not-has-[[data-slot=file-upload-item-preview-image]]:[grid-template-areas:'preview_name_delete'_'preview_meta_delete'] has-[[data-slot=file-upload-item-preview-image]]:max-w-40 has-[[data-slot=file-upload-item-preview-image]]:grow-0 has-[[data-slot=file-upload-item-preview-image]]:[grid-template-areas:'preview_preview'_'name_delete'_'meta_delete']";
const disabledClass =
  'data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';
</script>
<template>
  <ArkFileUploadItem
    v-bind="attrs"
    :class="cn(itemClass, disabledClass, className)"
    :file="file"
    data-slot="file-upload-item"
    ><slot
  /></ArkFileUploadItem>
</template>