<script setup lang="ts">
import { QrCodeDownloadTrigger as ArkQrCodeDownloadTrigger } from '@ark-ui/vue/qr-code';
import type { QrCodeDownloadTriggerProps } from '@ark-ui/vue/qr-code';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ QrCodeDownloadTriggerProps {
  class?: HTMLAttributes['class'];
  fileName: QrCodeDownloadTriggerProps['fileName'];
  mimeType: QrCodeDownloadTriggerProps['mimeType'];
}

const { class: className, fileName, mimeType } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkQrCodeDownloadTrigger
    v-bind="attrs"
    :class="
      cn(
        'box-border inline-flex min-h-control-md cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium whitespace-nowrap text-foreground transition-[border-color,background-color,color,opacity,box-shadow] duration-200 ease-in-out select-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0 [&:active:not(:disabled):not([data-disabled])]:opacity-[0.94] [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-accent',
        className,
      )
    "
    :file-name="fileName"
    :mime-type="mimeType"
    data-slot="qr-code-download-trigger"
  >
    <slot />
  </ArkQrCodeDownloadTrigger>
</template>