<script setup lang="ts">
import { useRatingGroupItemContext } from '@ark-ui/vue/rating-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { RatingStarIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './RatingGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface RatingGroupItemIndicatorProps extends HTMLAttributes {
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
    :class="clsx(styles.itemIndicator, className)"
    :data-half="item.half ? '' : undefined"
    :data-highlighted="item.highlighted ? '' : undefined"
    data-slot="rating-group-item-indicator"
  >
    <slot>
      <RatingStarIcon :class="styles.iconBg" data-slot="rating-group-item-indicator-bg" />
      <RatingStarIcon :class="styles.iconFg" data-slot="rating-group-item-indicator-fg" />
    </slot>
  </span>
</template>