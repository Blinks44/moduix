<script setup lang="ts">
import { FileUploadItemGroup as ArkFileUploadItemGroup } from '@ark-ui/vue/file-upload';
import type { FileUploadItemGroupProps } from '@ark-ui/vue/file-upload';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FileUpload.module.css';

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
    :class="clsx(styles.itemGroup, className)"
    data-slot="file-upload-item-group"
  >
    <slot />
  </ArkFileUploadItemGroup>
</template>