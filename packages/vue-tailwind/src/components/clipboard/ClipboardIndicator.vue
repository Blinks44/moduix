<script setup lang="ts">
import { ClipboardIndicator as ArkClipboardIndicator } from '@ark-ui/vue/clipboard';
import type { ClipboardIndicatorProps } from '@ark-ui/vue/clipboard';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, CopyIcon } from '@/lib/moduix/icons/ui';

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
    :class="cn('inline-flex shrink-0 items-center justify-center', className)"
    data-slot="clipboard-indicator"
  >
    <template #copied>
      <slot name="copied"><CheckIcon /></slot>
    </template>
    <template #default>
      <slot><CopyIcon /></slot>
    </template>
  </ArkClipboardIndicator>
</template>