<script setup lang="ts">
import { SignaturePadSegment as ArkSignaturePadSegment } from '@ark-ui/vue/signature-pad';
import type { SignaturePadSegmentProps } from '@ark-ui/vue/signature-pad';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './SignaturePad.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SignaturePadSegmentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();

const attrs = useAttrs();
</script>

<template>
  <ArkSignaturePadSegment
    v-bind="attrs"
    :class="clsx(styles.segment, className)"
    data-slot="signature-pad-segment"
  />
</template>