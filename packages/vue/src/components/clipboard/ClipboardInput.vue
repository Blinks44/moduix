<script setup lang="ts">
import { ClipboardInput as ArkClipboardInput } from '@ark-ui/vue/clipboard';
import type { ClipboardInputProps } from '@ark-ui/vue/clipboard';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Clipboard.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ClipboardInputProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkClipboardInput
    v-bind="attrs"
    :as-child="props.asChild"
    :class="clsx(!props.asChild && styles.input, props.class)"
    data-slot="clipboard-input"
  >
    <slot />
  </ArkClipboardInput>
</template>