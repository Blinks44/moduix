<script setup lang="ts">
import { ClipboardIndicator as ArkClipboardIndicator } from '@ark-ui/vue/clipboard';
import type { ClipboardIndicatorProps } from '@ark-ui/vue/clipboard';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CheckIcon, CopyIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Clipboard.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ClipboardIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{
  copied?: () => unknown;
  default?: () => unknown;
}>();

const attrs = useAttrs();
</script>

<template>
  <ArkClipboardIndicator
    v-bind="attrs"
    :class="clsx(styles.indicator, className)"
    data-slot="clipboard-indicator"
  >
    <template #copied>
      <slot name="copied">
        <span aria-hidden="true" data-slot="clipboard-indicator-copied-icon" :class="styles.icon">
          <CheckIcon />
        </span>
      </slot>
    </template>
    <template #default>
      <slot>
        <span aria-hidden="true" data-slot="clipboard-indicator-idle-icon" :class="styles.icon">
          <CopyIcon />
        </span>
      </slot>
    </template>
  </ArkClipboardIndicator>
</template>