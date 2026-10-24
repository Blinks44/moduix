<script setup lang="ts">
import { FileUploadItemName as ArkFileUploadItemName } from '@ark-ui/vue/file-upload';
import type { FileUploadItemNameProps } from '@ark-ui/vue/file-upload';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ FileUploadItemNameProps {
  class?: HTMLAttributes['class'];
}
const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const nameClass = 'truncate text-sm leading-5 font-medium [grid-area:name]';
</script>
<template>
  <ArkFileUploadItemName
    v-if="$slots.default"
    v-bind="attrs"
    :class="cn(nameClass, className)"
    data-slot="file-upload-item-name"
    ><slot
  /></ArkFileUploadItemName>
  <ArkFileUploadItemName
    v-else
    v-bind="attrs"
    :class="cn(nameClass, className)"
    data-slot="file-upload-item-name"
  />
</template>