<script setup lang="ts">
import { FileUploadLabel as ArkFileUploadLabel } from '@ark-ui/vue/file-upload';
import type { FileUploadLabelProps } from '@ark-ui/vue/file-upload';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ FileUploadLabelProps {
  class?: HTMLAttributes['class'];
}
const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const disabledClass =
  'data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';
</script>
<template>
  <ArkFileUploadLabel
    v-bind="attrs"
    :class="cn('text-sm leading-5 font-medium', disabledClass, className)"
    data-slot="file-upload-label"
    ><slot
  /></ArkFileUploadLabel>
</template>