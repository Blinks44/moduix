<script setup lang="ts">
import { FileUploadItemPreview as ArkFileUploadItemPreview } from '@ark-ui/vue/file-upload';
import type { FileUploadItemPreviewProps } from '@ark-ui/vue/file-upload';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ FileUploadItemPreviewProps {
  class?: HTMLAttributes['class'];
}
const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const previewClass =
  'col-start-1 row-start-1 inline-flex size-10 items-center justify-center overflow-hidden rounded-sm bg-muted text-muted-foreground group-not-has-[[data-slot=file-upload-item-preview-image]]/item:row-[1/span_2] group-has-[[data-slot=file-upload-item-preview-image]]/item:col-span-full group-has-[[data-slot=file-upload-item-preview-image]]/item:aspect-square group-has-[[data-slot=file-upload-item-preview-image]]/item:h-auto group-has-[[data-slot=file-upload-item-preview-image]]/item:w-full';
</script>
<template>
  <ArkFileUploadItemPreview
    v-bind="attrs"
    :class="cn(previewClass, className)"
    data-slot="file-upload-item-preview"
    ><slot
  /></ArkFileUploadItemPreview>
</template>