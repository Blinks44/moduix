<script setup lang="ts">
import { FileUploadClearTrigger as ArkFileUploadClearTrigger } from '@ark-ui/vue/file-upload';
import type { FileUploadClearTriggerProps } from '@ark-ui/vue/file-upload';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ FileUploadClearTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkFileUploadClearTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="className"
    data-slot="file-upload-clear-trigger"
  >
    <slot />
  </ArkFileUploadClearTrigger>
</template>