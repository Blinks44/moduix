<script setup lang="ts">
import { PopoverArrowTip as ArkPopoverArrowTip } from '@ark-ui/vue/popover';
import type { PopoverArrowTipProps } from '@ark-ui/vue/popover';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverArrowTipProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <ArkPopoverArrowTip
    v-bind="attrs"
    :class="cn('border-t border-l border-border', className)"
    data-slot="popover-arrow-tip"
  />
</template>