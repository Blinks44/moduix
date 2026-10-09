<script setup lang="ts">
import { ClipboardControl as ArkClipboardControl } from '@ark-ui/vue/clipboard';
import type { ClipboardControlProps } from '@ark-ui/vue/clipboard';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
    :class="cn('flex w-full items-center gap-2', className)"
    data-slot="clipboard-control"
  >
    <slot />
  </ArkClipboardControl>
</template>