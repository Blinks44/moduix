<script setup lang="ts">
import { FileUploadDropzone as ArkFileUploadDropzone } from '@ark-ui/vue/file-upload';
import type { FileUploadDropzoneProps } from '@ark-ui/vue/file-upload';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ FileUploadDropzoneProps {
  class?: HTMLAttributes['class'];
}
const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const dropzoneClass =
  'box-border grid min-h-32 w-full place-items-center gap-3 rounded-md border border-dashed border-border bg-background p-5 text-center text-muted-foreground transition-[border-color,background-color,color] duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-dragging:border-primary data-dragging:bg-accent data-dragging:text-foreground data-invalid:border-destructive data-readonly:opacity-50 motion-reduce:transition-none [&[role=button]:not([aria-disabled])]:cursor-pointer';
const disabledClass =
  'data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';
</script>
<template>
  <ArkFileUploadDropzone
    v-bind="attrs"
    :class="cn(dropzoneClass, disabledClass, className)"
    data-slot="file-upload-dropzone"
    ><slot
  /></ArkFileUploadDropzone>
</template>