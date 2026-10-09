<script setup lang="ts">
import { FileUploadItemSizeText as ArkFileUploadItemSizeText } from '@ark-ui/vue/file-upload';
import type { FileUploadItemSizeTextProps } from '@ark-ui/vue/file-upload';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ FileUploadItemSizeTextProps {
  class?: HTMLAttributes['class'];
}
const { class: className } = defineProps<Props>();
const attrs = useAttrs();
</script>
<template>
  <ArkFileUploadItemSizeText
    v-if="$slots.default"
    v-bind="attrs"
    :class="cn('text-xs leading-4 text-muted-foreground', className)"
    data-slot="file-upload-item-size-text"
  >
    <slot />
  </ArkFileUploadItemSizeText>
  <ArkFileUploadItemSizeText
    v-else
    v-bind="attrs"
    :class="cn('text-xs leading-4 text-muted-foreground', className)"
    data-slot="file-upload-item-size-text"
  />
</template>