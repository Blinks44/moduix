<script setup lang="ts">
import { QrCodeRootProvider as ArkQrCodeRootProvider } from '@ark-ui/vue/qr-code';
import type { QrCodeRootProviderProps } from '@ark-ui/vue/qr-code';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ QrCodeRootProviderProps {
  class?: HTMLAttributes['class'];
  value: QrCodeRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkQrCodeRootProvider
    v-bind="attrs"
    :class="
      cn(
        'relative box-border inline-flex w-32 max-w-full flex-col items-center gap-3 text-foreground',
        className,
      )
    "
    :value="value"
    data-slot="qr-code-root-provider"
  >
    <slot />
  </ArkQrCodeRootProvider>
</template>