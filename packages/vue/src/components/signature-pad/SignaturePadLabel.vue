<script setup lang="ts">
import { SignaturePadLabel as ArkSignaturePadLabel } from '@ark-ui/vue/signature-pad';
import type { SignaturePadLabelProps } from '@ark-ui/vue/signature-pad';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './SignaturePad.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SignaturePadLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSignaturePadLabel
    v-bind="attrs"
    :class="clsx(styles.label, className)"
    data-slot="signature-pad-label"
  >
    <slot />
  </ArkSignaturePadLabel>
</template>