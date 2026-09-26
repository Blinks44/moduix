<script setup lang="ts">
import { ClipboardInput as ArkClipboardInput } from '@ark-ui/vue/clipboard';
import type { ClipboardInputProps } from '@ark-ui/vue/clipboard';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Clipboard.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ClipboardInputProps {}

defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const className = computed(() => attrs.class as HTMLAttributes['class'] | undefined);
const forwardedAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <ArkClipboardInput
    v-bind="forwardedAttrs"
    :class="clsx(styles.input, className)"
    data-slot="clipboard-input"
  >
    <slot />
  </ArkClipboardInput>
</template>