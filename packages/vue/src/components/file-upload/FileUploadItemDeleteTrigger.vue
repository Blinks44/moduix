<script setup lang="ts">
import { FileUploadItemDeleteTrigger as ArkFileUploadItemDeleteTrigger } from '@ark-ui/vue/file-upload';
import type { FileUploadItemDeleteTriggerProps } from '@ark-ui/vue/file-upload';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { TrashIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './FileUpload.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FileUploadItemDeleteTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFileUploadItemDeleteTrigger
    v-bind="attrs"
    :class="clsx(styles.itemDeleteTrigger, className)"
    data-slot="file-upload-item-delete-trigger"
  >
    <slot><TrashIcon /></slot>
  </ArkFileUploadItemDeleteTrigger>
</template>