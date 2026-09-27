<script setup lang="ts">
import { RatingGroupRootProvider as ArkRatingGroupRootProvider } from '@ark-ui/vue/rating-group';
import type { RatingGroupRootProviderProps as ArkRatingGroupRootProviderProps } from '@ark-ui/vue/rating-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './RatingGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface RatingGroupRootProviderProps
  extends /* @vue-ignore */ ArkRatingGroupRootProviderProps {
  class?: HTMLAttributes['class'];
  size?: import('./RatingGroup.vue').RatingGroupSize;
  value: ArkRatingGroupRootProviderProps['value'];
}

const { class: className, size = 'md', value } = defineProps<RatingGroupRootProviderProps>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRatingGroupRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-size="size"
    :value="value"
    data-slot="rating-group-root-provider"
  >
    <slot />
  </ArkRatingGroupRootProvider>
</template>