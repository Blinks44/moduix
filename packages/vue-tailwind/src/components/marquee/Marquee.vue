<script setup lang="ts">
import { MarqueeRoot as ArkMarqueeRoot } from '@ark-ui/vue/marquee';
import type { MarqueeRootEmits, MarqueeRootProps } from '@ark-ui/vue/marquee';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ MarqueeRootProps {
  class?: HTMLAttributes['class'];
  side?: MarqueeRootProps['side'];
}

export interface Emits extends /* @vue-ignore */ MarqueeRootEmits {}

const { class: className, side } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkMarqueeRoot
    v-bind="attrs"
    :class="cn('group w-full', (side === 'top' || side === 'bottom') && 'h-60', className)"
    :side="side"
    data-slot="marquee-root"
  >
    <slot />
  </ArkMarqueeRoot>
</template>