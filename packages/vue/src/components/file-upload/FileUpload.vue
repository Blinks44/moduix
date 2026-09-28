<script setup lang="ts">
import { FileUploadRoot as ArkFileUploadRoot } from '@ark-ui/vue/file-upload';
import type { FileUploadRootEmits, FileUploadRootProps } from '@ark-ui/vue/file-upload';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FileUpload.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FileUploadRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ FileUploadRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFileUploadRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-slot="file-upload-root"
  >
    <slot />
  </ArkFileUploadRoot>
</template>