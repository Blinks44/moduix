<script setup lang="ts">
import { RatingGroupRoot as ArkRatingGroupRoot } from '@ark-ui/vue/rating-group';
import type {
  RatingGroupRootEmits,
  RatingGroupRootProps as ArkRatingGroupRootProps,
} from '@ark-ui/vue/rating-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './RatingGroup.module.css';

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
</script>

<template>
  <ArkRatingGroupRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-size="size"
    data-slot="rating-group-root"
  >
    <slot />
  </ArkRatingGroupRoot>
</template>