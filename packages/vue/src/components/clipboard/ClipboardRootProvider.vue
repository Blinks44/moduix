<script setup lang="ts">
import { ClipboardRootProvider as ArkClipboardRootProvider } from '@ark-ui/vue/clipboard';
import type { ClipboardRootProviderProps } from '@ark-ui/vue/clipboard';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Clipboard.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ClipboardRootProviderProps {
  class?: HTMLAttributes['class'];
  value: ClipboardRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkClipboardRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="clipboard-root-provider"
  >
    <slot />
  </ArkClipboardRootProvider>
</template>