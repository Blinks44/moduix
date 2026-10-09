<script setup lang="ts">
import { FileUploadItemName as ArkFileUploadItemName } from '@ark-ui/vue/file-upload';
import type { FileUploadItemNameProps } from '@ark-ui/vue/file-upload';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FileUpload.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FileUploadItemNameProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFileUploadItemName
    v-if="$slots.default"
    v-bind="attrs"
    :class="clsx(styles.itemName, className)"
    data-slot="file-upload-item-name"
    ><slot
  /></ArkFileUploadItemName>
  <ArkFileUploadItemName
    v-else
    v-bind="attrs"
    :class="clsx(styles.itemName, className)"
    data-slot="file-upload-item-name"
  />
</template>