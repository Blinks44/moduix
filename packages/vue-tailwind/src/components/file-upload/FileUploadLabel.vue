<script setup lang="ts">
import { FileUploadLabel as ArkFileUploadLabel } from '@ark-ui/vue/file-upload';
import type { FileUploadLabelProps } from '@ark-ui/vue/file-upload';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ FileUploadLabelProps {
  class?: HTMLAttributes['class'];
}
const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>
<template>
  <ArkFileUploadLabel
    v-bind="attrs"
    :class="cn('text-sm font-medium text-foreground data-disabled:opacity-50', className)"
    data-slot="file-upload-label"
    ><slot
  /></ArkFileUploadLabel>
</template>