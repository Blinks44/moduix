<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { UploadIcon } from '@/internal/icons/ui/Icons';
import { cn } from '@/lib/moduix/cn';

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
    :class="
      cn(
        'box-border inline-flex size-10 items-center justify-center rounded-full border border-border bg-muted text-foreground [&>svg]:size-4',
        className,
      )
    "
    data-slot="file-upload-dropzone-icon"
    ><slot><UploadIcon /></slot
  ></ark.span>
</template>