<script setup lang="ts">
import { FileUploadItemGroup as ArkFileUploadItemGroup } from '@ark-ui/vue/file-upload';
import type { FileUploadItemGroupProps } from '@ark-ui/vue/file-upload';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ FileUploadItemGroupProps {
  class?: HTMLAttributes['class'];
}
const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>
<template>
  <ArkFileUploadItemGroup
    v-bind="attrs"
    :class="cn('flex w-full flex-wrap items-start gap-2 empty:hidden', className)"
    data-slot="file-upload-item-group"
    ><slot
  /></ArkFileUploadItemGroup>
</template>