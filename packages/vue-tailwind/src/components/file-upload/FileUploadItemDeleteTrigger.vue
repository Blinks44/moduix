<script setup lang="ts">
import { FileUploadItemDeleteTrigger as ArkFileUploadItemDeleteTrigger } from '@ark-ui/vue/file-upload';
import type { FileUploadItemDeleteTriggerProps } from '@ark-ui/vue/file-upload';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { TrashIcon } from '@/lib/moduix/icons/ui/Icons';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ FileUploadItemDeleteTriggerProps {
  class?: HTMLAttributes['class'];
}
const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const deleteClass =
  'col-start-2 row-start-1 box-border inline-flex size-control-xs shrink-0 cursor-pointer appearance-none items-center justify-center justify-self-end rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out group-has-[[data-slot=file-upload-item-preview-image]]/item:row-[2/span_2] group-has-[[data-slot=file-upload-item-preview-image]]/item:self-center group-has-[[data-slot=file-upload-item-preview]]/item:group-not-has-[[data-slot=file-upload-item-preview-image]]/item:col-start-3 group-has-[[data-slot=file-upload-item-preview]]/item:group-not-has-[[data-slot=file-upload-item-preview-image]]/item:row-[1/span_2] group-has-[[data-slot=file-upload-item-size-text]]/item:group-not-has-[[data-slot=file-upload-item-preview-image]]/item:row-[1/span_2] focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 data-readonly:pointer-events-none data-readonly:cursor-default data-readonly:opacity-50 motion-reduce:transition-none [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-readonly]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-readonly]):hover]:text-foreground';
</script>
<template>
  <ArkFileUploadItemDeleteTrigger
    v-bind="attrs"
    :class="cn(deleteClass, className)"
    data-slot="file-upload-item-delete-trigger"
    ><slot><TrashIcon /></slot
  ></ArkFileUploadItemDeleteTrigger>
</template>