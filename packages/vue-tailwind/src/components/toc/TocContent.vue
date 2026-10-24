<script setup lang="ts">
import { TocContent as ArkTocContent } from '@ark-ui/vue/toc';
import type { TocContentProps } from '@ark-ui/vue/toc';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTocContent v-bind="attrs" :class="cn('min-w-0', className)" data-slot="toc-content">
    <slot />
  </ArkTocContent>
</template>