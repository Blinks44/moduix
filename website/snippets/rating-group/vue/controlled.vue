<script setup lang="ts">
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/vue/rating-group';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';
import styles from '@/components/examples/rating-group/component-controlled.module.css';

const value = ref(3);
</script>

<template>
  <Stack align="center" gap="3">
    <RatingGroup v-model="value">
      <RatingGroupLabel>Support quality</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>
    <div data-preview-meta>
      <output :class="styles.hint">Current value: {{ value }}</output>
    </div>
  </Stack>
</template>