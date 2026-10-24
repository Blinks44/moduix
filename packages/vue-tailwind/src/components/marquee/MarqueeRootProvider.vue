<script setup lang="ts">
import { MarqueeRootProvider as ArkMarqueeRootProvider } from '@ark-ui/vue/marquee';
import type { MarqueeRootProviderProps } from '@ark-ui/vue/marquee';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ MarqueeRootProviderProps {
  class?: HTMLAttributes['class'];
  value: MarqueeRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkMarqueeRootProvider
    v-bind="attrs"
    :class="cn('group w-full', value.orientation === 'vertical' && 'h-60', className)"
    :value="value"
    data-slot="marquee-root-provider"
  >
    <slot />
  </ArkMarqueeRootProvider>
</template>