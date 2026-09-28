<script setup lang="ts">
import { HoverCardArrowTip as ArkHoverCardArrowTip } from '@ark-ui/vue/hover-card';
import type { HoverCardArrowTipProps } from '@ark-ui/vue/hover-card';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HoverCardArrowTipProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <ArkHoverCardArrowTip
    v-bind="attrs"
    :class="cn('border-t border-l border-border', className)"
    data-slot="hover-card-arrow-tip"
  />
</template>