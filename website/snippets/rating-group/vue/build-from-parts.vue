<script setup lang="ts">
import {
  RatingGroup,
  RatingGroupContext,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupItemIndicator,
  RatingGroupLabel,
} from '@moduix/vue/rating-group';
</script>

<template>
  <RatingGroup :default-value="4">
    <RatingGroupLabel>Overall satisfaction</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupContext v-slot="context">
        <RatingGroupItem v-for="item in context.items" :key="item" :index="item">
          <RatingGroupItemIndicator />
        </RatingGroupItem>
      </RatingGroupContext>
    </RatingGroupControl>
    <RatingGroupHiddenInput />
  </RatingGroup>
</template>