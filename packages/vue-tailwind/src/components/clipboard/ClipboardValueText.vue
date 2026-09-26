<script setup lang="ts">
import { ClipboardValueText as ArkClipboardValueText } from '@ark-ui/vue/clipboard';
import type { ClipboardValueTextProps } from '@ark-ui/vue/clipboard';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
    :class="cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className)"
    data-slot="clipboard-value-text"
  >
    <slot />
  </ArkClipboardValueText>
</template>