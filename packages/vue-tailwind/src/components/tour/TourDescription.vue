<script setup lang="ts">
import { TourDescription as ArkTourDescription } from '@ark-ui/vue/tour';
import type { TourDescriptionProps } from '@ark-ui/vue/tour';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourDescriptionProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourDescription
    v-if="!$slots.default"
    v-bind="attrs"
    :class="cn('text-sm leading-5 text-muted-foreground', className)"
    data-slot="tour-description"
  />
  <ArkTourDescription
    v-else
    v-bind="attrs"
    :class="cn('text-sm leading-5 text-muted-foreground', className)"
    data-slot="tour-description"
  >
    <slot />
  </ArkTourDescription>
</template>