<script setup lang="ts">
import { Heart as HeartIcon } from '@lucide/vue';
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItemIndicator,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/vue/rating-group';
import styles from '@/components/examples/rating-group/component-custom-icon.module.css';
</script>

<template>
  <RatingGroup :default-value="3">
    <RatingGroupLabel>Checklist score</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupItems>
        <RatingGroupItemIndicator :class="styles.customIcon"
          ><HeartIcon
        /></RatingGroupItemIndicator>
      </RatingGroupItems>
    </RatingGroupControl>
  </RatingGroup>
</template>