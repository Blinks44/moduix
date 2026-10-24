<script setup lang="ts">
import { FileUploadTrigger as ArkFileUploadTrigger } from '@ark-ui/vue/file-upload';
import type { FileUploadTriggerProps } from '@ark-ui/vue/file-upload';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ FileUploadTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkFileUploadTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="className"
    data-slot="file-upload-trigger"
  >
    <slot />
  </ArkFileUploadTrigger>
</template>