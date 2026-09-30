<script setup lang="ts">
import { SignaturePadControl as ArkSignaturePadControl } from '@ark-ui/vue/signature-pad';
import type { SignaturePadControlProps } from '@ark-ui/vue/signature-pad';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './SignaturePad.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SignaturePadControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSignaturePadControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="signature-pad-control"
  >
    <slot />
  </ArkSignaturePadControl>
</template>