<script setup lang="ts">
import { RatingGroupItem as ArkRatingGroupItem } from '@ark-ui/vue/rating-group';
import type { RatingGroupItemProps } from '@ark-ui/vue/rating-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RatingGroupItemProps {
  class?: HTMLAttributes['class'];
  index: RatingGroupItemProps['index'];
}

const { class: className, index } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRatingGroupItem
    v-bind="attrs"
    :class="
      cn(
        'inline-flex cursor-pointer items-center justify-center rounded-sm leading-none text-inherit transition-[color,opacity] duration-200 ease-in-out outline-none data-disabled:pointer-events-none data-disabled:cursor-default data-readonly:cursor-default motion-reduce:transition-none',
        className,
      )
    "
    :index="index"
    data-slot="rating-group-item"
  >
    <slot />
  </ArkRatingGroupItem>
</template>