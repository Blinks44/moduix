<script setup lang="ts">
import { FileUploadClearTrigger as ArkFileUploadClearTrigger } from '@ark-ui/vue/file-upload';
import type { FileUploadClearTriggerProps } from '@ark-ui/vue/file-upload';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CloseIcon } from '@/lib/moduix/icons/ui/Icons';
import CloseButton from '../close-button/CloseButton.vue';

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
    v-bind="attrs"
    as-child
    :aria-label="asChild ? clearLabel : undefined"
    :aria-labelledby="asChild ? ariaLabelledby : undefined"
    :class="
      cn(
        `size-control-xs self-start rounded-sm bg-transparent text-muted-foreground focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring data-readonly:pointer-events-none data-readonly:opacity-50 [&>svg:not([class*='size-'])]:size-4`,
        $slots.default && 'size-control-sm w-auto gap-2 px-2 text-sm leading-5',
        className,
      )
    "
    data-slot="file-upload-clear-trigger"
  >
    <slot v-if="asChild" />
    <CloseButton
      v-else
      :aria-label="clearLabel"
      :aria-labelledby="ariaLabelledby"
      data-part="root"
      data-scope="close-button"
      data-slot="file-upload-clear-trigger"
      ><slot><CloseIcon /></slot
    ></CloseButton>
  </ArkFileUploadClearTrigger>
</template>