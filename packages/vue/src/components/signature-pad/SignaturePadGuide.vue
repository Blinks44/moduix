<script setup lang="ts">
import { SignaturePadGuide as ArkSignaturePadGuide } from '@ark-ui/vue/signature-pad';
import type { SignaturePadGuideProps } from '@ark-ui/vue/signature-pad';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './SignaturePad.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SignaturePadGuideProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSignaturePadGuide
    v-bind="attrs"
    :class="clsx(styles.guide, className)"
    data-slot="signature-pad-guide"
  >
    <slot />
  </ArkSignaturePadGuide>
</template>