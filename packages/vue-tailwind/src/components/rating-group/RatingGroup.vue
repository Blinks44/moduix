<script setup lang="ts">
import { RatingGroupRoot as ArkRatingGroupRoot } from '@ark-ui/vue/rating-group';
import type {
  RatingGroupRootEmits,
  RatingGroupRootProps as ArkRatingGroupRootProps,
} from '@ark-ui/vue/rating-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export type RatingGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface RatingGroupRootProps extends /* @vue-ignore */ ArkRatingGroupRootProps {
  class?: HTMLAttributes['class'];
  size?: RatingGroupSize;
}

export interface Emits extends /* @vue-ignore */ RatingGroupRootEmits {}

const { class: className, size = 'md' } = defineProps<RatingGroupRootProps>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass = 'group/rating-group inline-flex flex-col gap-1 text-muted-foreground';
</script>

<template>
  <ArkRatingGroupRoot
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :data-size="size"
    data-slot="rating-group-root"
  >
    <slot />
  </ArkRatingGroupRoot>
</template>