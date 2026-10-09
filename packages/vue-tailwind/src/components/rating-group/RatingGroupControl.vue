<script setup lang="ts">
import { RatingGroupControl as ArkRatingGroupControl } from '@ark-ui/vue/rating-group';
import type { RatingGroupControlProps } from '@ark-ui/vue/rating-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RatingGroupControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRatingGroupControl
    v-bind="attrs"
    :class="cn('inline-flex items-center gap-1 data-disabled:opacity-50', className)"
    data-slot="rating-group-control"
  >
    <slot />
  </ArkRatingGroupControl>
</template>