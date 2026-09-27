<script setup lang="ts">
import { RatingGroupRootProvider as ArkRatingGroupRootProvider } from '@ark-ui/vue/rating-group';
import type { RatingGroupRootProviderProps as ArkRatingGroupRootProviderProps } from '@ark-ui/vue/rating-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import type { RatingGroupSize } from './RatingGroup.vue';

defineOptions({ inheritAttrs: false });

export interface RatingGroupRootProviderProps
  extends /* @vue-ignore */ ArkRatingGroupRootProviderProps {
  class?: HTMLAttributes['class'];
  size?: RatingGroupSize;
  value: ArkRatingGroupRootProviderProps['value'];
}

const { class: className, size = 'md', value } = defineProps<RatingGroupRootProviderProps>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass = 'group/rating-group inline-flex flex-col gap-1 text-muted-foreground';
</script>

<template>
  <ArkRatingGroupRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :data-size="size"
    :value="value"
    data-slot="rating-group-root-provider"
  >
    <slot />
  </ArkRatingGroupRootProvider>
</template>