<script setup lang="ts">
import { PopoverTitle as ArkPopoverTitle } from '@ark-ui/vue/popover';
import type { PopoverTitleProps } from '@ark-ui/vue/popover';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '../../internal/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverTitleProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPopoverTitle
    v-bind="attrs"
    :class="cn('text-md font-semibold text-popover-foreground', className)"
    data-slot="popover-title"
  >
    <slot />
  </ArkPopoverTitle>
</template>