<script setup lang="ts">
import { FileUploadTrigger as ArkFileUploadTrigger } from '@ark-ui/vue/file-upload';
import type { FileUploadTriggerProps } from '@ark-ui/vue/file-upload';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './FileUpload.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FileUploadTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFileUploadTrigger
    v-bind="attrs"
    :class="clsx(styles.trigger, className)"
    data-slot="file-upload-trigger"
  >
    <slot />
  </ArkFileUploadTrigger>
</template>