<script setup lang="ts">
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/vue/rating-group';
import { Stack } from '@moduix/vue/stack';
</script>

<template>
  <Stack align="center" gap="3">
    <RatingGroup :default-value="4" disabled>
      <RatingGroupLabel>Disabled rating</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>
    <RatingGroup :default-value="2" read-only>
      <RatingGroupLabel>Read-only rating</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>
  </Stack>
</template>