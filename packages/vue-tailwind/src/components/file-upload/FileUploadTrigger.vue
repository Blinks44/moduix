<script setup lang="ts">
import { FileUploadTrigger as ArkFileUploadTrigger } from '@ark-ui/vue/file-upload';
import type { FileUploadTriggerProps } from '@ark-ui/vue/file-upload';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ FileUploadTriggerProps {
  class?: HTMLAttributes['class'];
}
const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const triggerClass =
  'box-border inline-flex min-h-control-md cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-primary bg-primary px-4 text-sm leading-5 font-medium whitespace-nowrap text-primary-foreground transition-[border-color,background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default data-disabled:pointer-events-none data-disabled:cursor-default data-invalid:border-destructive data-readonly:pointer-events-none data-readonly:cursor-default motion-reduce:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-readonly]):hover]:bg-foreground';
</script>
<template>
  <ArkFileUploadTrigger
    v-bind="attrs"
    :class="cn(triggerClass, className)"
    data-slot="file-upload-trigger"
    ><slot
  /></ArkFileUploadTrigger>
</template>