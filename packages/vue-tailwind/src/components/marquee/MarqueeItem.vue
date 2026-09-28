<script setup lang="ts">
import { MarqueeItem as ArkMarqueeItem } from '@ark-ui/vue/marquee';
import type { MarqueeItemProps } from '@ark-ui/vue/marquee';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ MarqueeItemProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkMarqueeItem v-bind="attrs" :class="cn('shrink-0', className)" data-slot="marquee-item">
    <slot />
  </ArkMarqueeItem>
</template>