<script setup lang="ts">
import { RatingGroupLabel as ArkRatingGroupLabel } from '@ark-ui/vue/rating-group';
import type { RatingGroupLabelProps } from '@ark-ui/vue/rating-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RatingGroupLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRatingGroupLabel
    v-bind="attrs"
    :class="
      cn(
        'text-sm leading-5 font-semibold text-foreground select-none data-disabled:opacity-50',
        className,
      )
    "
    data-slot="rating-group-label"
  >
    <slot />
  </ArkRatingGroupLabel>
</template>