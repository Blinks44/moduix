<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  RatingGroupContext,
  RatingGroupControl,
  RatingGroupItem,
  RatingGroupItemIndicator,
  RatingGroupLabel,
  RatingGroupRootProvider,
  useRatingGroup,
} from '@moduix/vue/rating-group';
import styles from '@/components/examples/rating-group/component-advanced-customization.module.css';

const ratingGroup = useRatingGroup({ count: 5, defaultValue: 3 });
</script>

<template>
  <div :class="styles.stack">
    <RatingGroupRootProvider :value="ratingGroup">
      <RatingGroupLabel>Product quality</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupContext v-slot="context">
          <RatingGroupItem v-for="item in context.items" :key="item" :index="item">
            <RatingGroupItemIndicator />
          </RatingGroupItem>
        </RatingGroupContext>
      </RatingGroupControl>
    </RatingGroupRootProvider>
    <output>Current value: {{ ratingGroup.value }}</output>
    <Button type="button" size="sm" @click="ratingGroup.setValue(5)">Set to 5</Button>
  </div>
</template>