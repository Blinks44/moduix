<script setup lang="ts">
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/vue/rating-group';
</script>

<template>
  <RatingGroup :default-value="4">
    <RatingGroupLabel>Overall satisfaction</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupItems />
    </RatingGroupControl>
    <RatingGroupHiddenInput />
  </RatingGroup>
</template>