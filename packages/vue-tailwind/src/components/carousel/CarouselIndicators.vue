<script setup lang="ts">
import { useCarouselContext } from '@ark-ui/vue/carousel';
import type { CarouselIndicatorGroupProps } from '@ark-ui/vue/carousel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import CarouselIndicator from './CarouselIndicator.vue';
import CarouselIndicatorGroup from './CarouselIndicatorGroup.vue';

defineOptions({ inheritAttrs: false });

export interface Props
  extends /* @vue-ignore */ Omit<CarouselIndicatorGroupProps, 'asChild' | 'children'> {
  class?: HTMLAttributes['class'];
  indicatorClassName?: string;
}

const { class: className, indicatorClassName } = defineProps<Props>();

const carousel = useCarouselContext();
const attrs = useAttrs();
</script>

<template>
  <CarouselIndicatorGroup v-bind="attrs" :class="className">
    <CarouselIndicator
      v-for="(_, index) in carousel.pageSnapPoints"
      :key="index"
      :class="indicatorClassName"
      :index="index"
    />
  </CarouselIndicatorGroup>
</template>