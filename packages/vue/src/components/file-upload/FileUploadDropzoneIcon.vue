<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { UploadIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './FileUpload.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.span
    aria-hidden="true"
    v-bind="attrs"
    :class="clsx(styles.dropzoneIcon, className)"
    data-slot="file-upload-dropzone-icon"
  >
    <slot><UploadIcon /></slot>
  </ark.span>
</template>