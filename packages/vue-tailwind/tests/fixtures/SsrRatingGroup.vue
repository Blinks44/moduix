<script setup lang="ts">
import {
  RatingGroup,
  RatingGroupLabel,
  RatingGroupControl,
  RatingGroupItems,
  RatingGroupHiddenInput,
} from '../../src';
</script>

<template>
  <RatingGroup :default-value="3">
    <RatingGroupLabel>Rating</RatingGroupLabel>
    <RatingGroupControl><RatingGroupItems /></RatingGroupControl>
    <RatingGroupHiddenInput />
  </RatingGroup>
</template>