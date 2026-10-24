<script setup lang="ts">
import { FileUploadItemDeleteTrigger as ArkFileUploadItemDeleteTrigger } from '@ark-ui/vue/file-upload';
import type { FileUploadItemDeleteTriggerProps } from '@ark-ui/vue/file-upload';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { TrashIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ FileUploadItemDeleteTriggerProps {
  class?: HTMLAttributes['class'];
}
const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const deleteClass =
  'inline-flex size-control-xs cursor-pointer appearance-none items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color] duration-normal ease-in-out [grid-area:delete] focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring disabled:cursor-default data-readonly:opacity-disabled [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):hover]:text-foreground';
</script>
<template>
  <ArkFileUploadItemDeleteTrigger
    v-bind="attrs"
    :class="cn(deleteClass, className)"
    data-slot="file-upload-item-delete-trigger"
    ><slot><TrashIcon /></slot
  ></ArkFileUploadItemDeleteTrigger>
</template>