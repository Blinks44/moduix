<script setup lang="ts">
import { AngleSliderMarkerGroup as ArkAngleSliderMarkerGroup } from '@ark-ui/vue/angle-slider';
import type { AngleSliderMarkerGroupProps } from '@ark-ui/vue/angle-slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AngleSliderMarkerGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAngleSliderMarkerGroup
    v-bind="attrs"
    :class="cn('pointer-events-none absolute inset-0 z-1', className)"
    data-slot="angle-slider-marker-group"
  >
    <slot />
  </ArkAngleSliderMarkerGroup>
</template>