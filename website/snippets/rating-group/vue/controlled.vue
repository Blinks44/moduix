<script setup lang="ts">
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/vue/rating-group';
import { ref } from 'vue';

const value = ref(3);
</script>

<template>
  <RatingGroup v-model="value">
    <RatingGroupLabel>Support quality</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupItems />
    </RatingGroupControl>
  </RatingGroup>
  <output>Current value: {{ value }}</output>
</template>