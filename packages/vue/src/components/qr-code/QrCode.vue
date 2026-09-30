<script setup lang="ts">
import { QrCodeRoot as ArkQrCodeRoot } from '@ark-ui/vue/qr-code';
import type { QrCodeRootProps } from '@ark-ui/vue/qr-code';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './QrCode.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ QrCodeRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits {
  valueChange: [details: { value: string }];
  'update:modelValue': [value: string];
}

const { class: className } = defineProps<Props>();
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkQrCodeRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-slot="qr-code-root"
    @value-change="emit('valueChange', $event)"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </ArkQrCodeRoot>
</template>