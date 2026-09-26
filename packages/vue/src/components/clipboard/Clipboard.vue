<script setup lang="ts">
import { ClipboardRoot as ArkClipboardRoot } from '@ark-ui/vue/clipboard';
import type { ClipboardCopyStatusDetails, ClipboardRootProps } from '@ark-ui/vue/clipboard';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Clipboard.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ClipboardRootProps {
  class?: HTMLAttributes['class'];
}

export interface ClipboardValueChangeDetails {
  value: string;
}

export interface Emits {
  valueChange: [details: ClipboardValueChangeDetails];
  'update:modelValue': [value: string];
  statusChange: [details: ClipboardCopyStatusDetails];
}

const { class: className } = defineProps<Props>();
const emit = defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkClipboardRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-slot="clipboard-root"
    @value-change="emit('valueChange', $event)"
    @update:model-value="emit('update:modelValue', $event)"
    @status-change="emit('statusChange', $event)"
  >
    <slot />
  </ArkClipboardRoot>
</template>