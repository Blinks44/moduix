<script setup lang="ts">
import { ClipboardValueText as ArkClipboardValueText } from '@ark-ui/vue/clipboard';
import type { ClipboardValueTextProps } from '@ark-ui/vue/clipboard';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Clipboard.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ClipboardValueTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkClipboardValueText
    v-bind="attrs"
    :class="clsx(styles.valueText, className)"
    data-slot="clipboard-value-text"
  >
    <slot />
  </ArkClipboardValueText>
</template>