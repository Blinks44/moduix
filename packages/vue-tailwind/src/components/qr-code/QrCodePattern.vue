<script setup lang="ts">
import { QrCodePattern as ArkQrCodePattern } from '@ark-ui/vue/qr-code';
import type { QrCodePatternProps } from '@ark-ui/vue/qr-code';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ QrCodePatternProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkQrCodePattern
    v-bind="attrs"
    :class="cn('fill-inherit', className)"
    data-slot="qr-code-pattern"
  >
    <slot />
  </ArkQrCodePattern>
</template>