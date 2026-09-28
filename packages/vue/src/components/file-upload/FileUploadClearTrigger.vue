<script setup lang="ts">
import { FileUploadClearTrigger as ArkFileUploadClearTrigger } from '@ark-ui/vue/file-upload';
import type { FileUploadClearTriggerProps } from '@ark-ui/vue/file-upload';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CloseIcon } from '@/internal/icons/ui/Icons';
import CloseButton from '../close-button/CloseButton.vue';
import styles from './FileUpload.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FileUploadClearTriggerProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, ariaLabelledby, asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const clearLabel = computed(
  () => ariaLabel ?? (ariaLabelledby == null ? 'Clear files' : undefined),
);
</script>

<template>
  <ArkFileUploadClearTrigger
    v-if="asChild"
    v-bind="attrs"
    as-child
    :aria-label="clearLabel"
    :aria-labelledby="ariaLabelledby"
    :class="clsx(styles.clearTrigger, $slots.default && styles.clearTriggerWithContent, className)"
    data-slot="file-upload-clear-trigger"
  >
    <slot />
  </ArkFileUploadClearTrigger>
  <ArkFileUploadClearTrigger
    v-else
    v-bind="attrs"
    as-child
    :class="clsx(styles.clearTrigger, $slots.default && styles.clearTriggerWithContent, className)"
    data-slot="file-upload-clear-trigger"
  >
    <CloseButton
      :aria-label="ariaLabel ?? (ariaLabelledby == null ? 'Clear files' : undefined)"
      :aria-labelledby="ariaLabelledby"
      data-part="root"
      data-scope="close-button"
      data-slot="file-upload-clear-trigger"
    >
      <slot><CloseIcon /></slot>
    </CloseButton>
  </ArkFileUploadClearTrigger>
</template>