<script setup lang="ts">
import { ClipboardLabel as ArkClipboardLabel } from '@ark-ui/vue/clipboard';
import type { ClipboardLabelProps } from '@ark-ui/vue/clipboard';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ClipboardLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkClipboardLabel
    v-bind="attrs"
    :class="cn('text-sm leading-5 font-medium', className)"
    data-slot="clipboard-label"
  >
    <slot />
  </ArkClipboardLabel>
</template>