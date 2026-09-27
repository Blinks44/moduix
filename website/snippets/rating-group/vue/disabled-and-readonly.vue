<script setup lang="ts">
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/vue/rating-group';
import styles from '@/components/examples/rating-group/component-disabled-and-readonly.module.css';
</script>

<template>
  <div :class="styles.stack">
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
  </div>
</template>