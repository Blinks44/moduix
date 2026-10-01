<script setup lang="ts">
import { TocTitle as ArkTocTitle } from '@ark-ui/vue/toc';
import type { TocTitleProps } from '@ark-ui/vue/toc';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocTitleProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTocTitle
    v-bind="attrs"
    :class="cn('m-0 mb-2 text-sm leading-5 font-semibold text-foreground', className)"
    data-slot="toc-title"
  >
    <slot />
  </ArkTocTitle>
</template>