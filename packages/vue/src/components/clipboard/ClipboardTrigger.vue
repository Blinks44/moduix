<script setup lang="ts">
import { ClipboardTrigger as ArkClipboardTrigger } from '@ark-ui/vue/clipboard';
import type { ClipboardTriggerProps } from '@ark-ui/vue/clipboard';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Clipboard.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ClipboardTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkClipboardTrigger
    v-bind="attrs"
    :class="clsx(styles.trigger, className)"
    data-slot="clipboard-trigger"
  >
    <slot />
  </ArkClipboardTrigger>
</template>