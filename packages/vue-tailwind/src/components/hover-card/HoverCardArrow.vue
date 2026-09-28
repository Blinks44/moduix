<script setup lang="ts">
import { HoverCardArrow as ArkHoverCardArrow } from '@ark-ui/vue/hover-card';
import type { HoverCardArrowProps } from '@ark-ui/vue/hover-card';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import HoverCardArrowTip from './HoverCardArrowTip.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HoverCardArrowProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkHoverCardArrow
    v-bind="attrs"
    :class="
      cn(
        '[--arrow-background:var(--color-popover)] [--arrow-shadow-color:var(--color-border)] [--arrow-size:0.625rem]',
        className,
      )
    "
    data-slot="hover-card-arrow"
  >
    <slot><HoverCardArrowTip /></slot>
  </ArkHoverCardArrow>
</template>