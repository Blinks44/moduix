<script setup lang="ts">
import { useRatingGroupItemContext } from '@ark-ui/vue/rating-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { RatingStarIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface RatingGroupItemIndicatorProps extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<RatingGroupItemIndicatorProps>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const item = useRatingGroupItemContext();
</script>

<template>
  <span
    v-bind="attrs"
    :class="
      cn(
        'relative inline-flex size-5 items-center justify-center text-primary group-data-[size=lg]/rating-group:size-6 group-data-[size=sm]/rating-group:size-4 group-data-[size=xl]/rating-group:size-7 group-data-[size=xs]/rating-group:size-3.5 [&>svg]:size-full [&>svg]:flex-none [&>svg]:transition-[color,fill,stroke,clip-path] [&>svg]:duration-200 [&>svg]:ease-in-out motion-reduce:[&>svg]:transition-none',
        className,
      )
    "
    :data-half="item.half ? '' : undefined"
    :data-highlighted="item.highlighted ? '' : undefined"
    data-slot="rating-group-item-indicator"
  >
    <slot>
      <RatingStarIcon
        class="absolute inset-0 size-full flex-none fill-transparent stroke-current text-muted-foreground"
        data-slot="rating-group-item-indicator-bg"
      />
      <RatingStarIcon
        :class="
          cn(
            'absolute inset-0 size-full flex-none fill-current stroke-current text-primary [clip-path:inset(0_0_0_0)]',
            item.half && '[clip-path:inset(0_50%_0_0)] rtl:[clip-path:inset(0_0_0_50%)]',
            !item.highlighted && '[clip-path:inset(0_100%_0_0)]',
          )
        "
        data-slot="rating-group-item-indicator-fg"
      />
    </slot>
  </span>
</template>