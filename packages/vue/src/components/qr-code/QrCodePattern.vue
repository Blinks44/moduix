<script setup lang="ts">
import { QrCodePattern as ArkQrCodePattern } from '@ark-ui/vue/qr-code';
import type { QrCodePatternProps } from '@ark-ui/vue/qr-code';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './QrCode.module.css';

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
    :class="clsx(styles.pattern, className)"
    data-slot="qr-code-pattern"
  >
    <slot />
  </ArkQrCodePattern>
</template>