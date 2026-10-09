<script setup lang="ts">
import { RatingGroupContext as ArkRatingGroupContext } from '@ark-ui/vue/rating-group';
import RatingGroupItem from './RatingGroupItem.vue';
import RatingGroupItemIndicator from './RatingGroupItemIndicator.vue';

defineSlots<{ default?: () => unknown }>();
</script>

<template>
  <ArkRatingGroupContext v-slot="ratingGroup">
    <RatingGroupItem v-for="item in ratingGroup.items" :key="item" :index="item">
      <slot>
        <RatingGroupItemIndicator />
      </slot>
    </RatingGroupItem>
  </ArkRatingGroupContext>
</template>