<script setup lang="ts">
import { QrCodePattern as ArkQrCodePattern } from '@ark-ui/vue/qr-code';
import type { QrCodePatternProps } from '@ark-ui/vue/qr-code';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ QrCodePatternProps {}

defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkQrCodePattern v-bind="attrs" data-slot="qr-code-pattern">
    <slot />
  </ArkQrCodePattern>
</template>