<script setup lang="ts">
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/vue/rating-group';
</script>

<template>
  <RatingGroup allow-half :default-value="3.5">
    <RatingGroupLabel>Average delivery score</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupItems />
    </RatingGroupControl>
  </RatingGroup>
</template>