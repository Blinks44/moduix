<script setup lang="ts">
import { useAttrs } from 'vue';
import type { HTMLAttributes, SVGAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { FileIcon } from '@/lib/moduix/icons/ui/Icons';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ SVGAttributes {
  class?: HTMLAttributes['class'];
}
const { class: className } = defineProps<Props>();
const attrs = useAttrs();
</script>
<template>
  <FileIcon
    v-bind="attrs"
    :class="cn('size-4', className)"
    data-slot="file-upload-item-preview-icon"
  />
</template>