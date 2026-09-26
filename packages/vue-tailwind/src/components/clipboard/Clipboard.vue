<script setup lang="ts">
import { ClipboardRoot as ArkClipboardRoot } from '@ark-ui/vue/clipboard';
import type { ClipboardCopyStatusDetails, ClipboardRootProps } from '@ark-ui/vue/clipboard';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
const rootClass = 'flex w-full flex-col gap-1.5 text-foreground';
</script>

<template>
  <ArkClipboardRoot
    v-bind="attrs"
    :class="cn(rootClass, className)"
    data-slot="clipboard-root"
    @value-change="emit('valueChange', $event)"
    @update:model-value="emit('update:modelValue', $event)"
    @status-change="emit('statusChange', $event)"
  >
    <slot />
  </ArkClipboardRoot>
</template>