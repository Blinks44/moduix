<script setup lang="ts">
import { FileUploadRoot as ArkFileUploadRoot } from '@ark-ui/vue/file-upload';
import type { FileUploadRootEmits, FileUploadRootProps } from '@ark-ui/vue/file-upload';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FileUploadRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ FileUploadRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const rootClass = 'box-border flex w-full max-w-md flex-col items-start gap-3 text-foreground';
</script>

<template>
  <ArkFileUploadRoot v-bind="attrs" :class="cn(rootClass, className)" data-slot="file-upload-root">
    <slot />
  </ArkFileUploadRoot>
</template>