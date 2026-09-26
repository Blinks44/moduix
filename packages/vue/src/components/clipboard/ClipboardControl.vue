<script setup lang="ts">
import { ClipboardControl as ArkClipboardControl } from '@ark-ui/vue/clipboard';
import type { ClipboardControlProps } from '@ark-ui/vue/clipboard';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Clipboard.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ClipboardControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkClipboardControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="clipboard-control"
  >
    <slot />
  </ArkClipboardControl>
</template>