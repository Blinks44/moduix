<script setup lang="ts">
import { FileUploadRootProvider as ArkFileUploadRootProvider } from '@ark-ui/vue/file-upload';
import type { FileUploadRootProviderProps } from '@ark-ui/vue/file-upload';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FileUpload.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FileUploadRootProviderProps {
  class?: HTMLAttributes['class'];
  value: FileUploadRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFileUploadRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="file-upload-root-provider"
  >
    <slot />
  </ArkFileUploadRootProvider>
</template>