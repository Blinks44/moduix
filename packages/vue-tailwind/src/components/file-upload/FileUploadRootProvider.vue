<script setup lang="ts">
import { FileUploadRootProvider as ArkFileUploadRootProvider } from '@ark-ui/vue/file-upload';
import type { FileUploadRootProviderProps } from '@ark-ui/vue/file-upload';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FileUploadRootProviderProps {
  class?: HTMLAttributes['class'];
  value: FileUploadRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const rootClass = 'box-border flex w-full max-w-md flex-col items-start gap-3 text-foreground';
</script>

<template>
  <ArkFileUploadRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :value="value"
    data-slot="file-upload-root-provider"
  >
    <slot />
  </ArkFileUploadRootProvider>
</template>