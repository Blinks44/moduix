<script setup lang="ts">
import { PopoverArrow as ArkPopoverArrow } from '@ark-ui/vue/popover';
import type { PopoverArrowProps } from '@ark-ui/vue/popover';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '../../internal/cn';
import PopoverArrowTip from './PopoverArrowTip.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverArrowProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPopoverArrow
    v-bind="attrs"
    :class="
      cn('[--arrow-background:var(--color-popover)] [--arrow-size:var(--spacing-2_5)]', className)
    "
    data-slot="popover-arrow"
  >
    <PopoverArrowTip v-if="!$slots.default" />
    <slot v-else />
  </ArkPopoverArrow>
</template>