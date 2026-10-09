<script setup lang="ts">
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemControl,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
} from '@moduix/vue/segment-group';
import styles from '@/components/examples/segment-group/segment-group-advanced-customization.module.css';

const billingCycles = [
  ['Monthly', 'Pay monthly'],
  ['Annual', 'Save 20%'],
] as const;
</script>

<template>
  <SegmentGroup aria-label="Billing cycle" default-value="Monthly">
    <SegmentGroupIndicator />
    <SegmentGroupItem
      v-for="[item, description] in billingCycles"
      :key="item"
      :class="styles.item"
      :value="item"
      as-child
    >
      <label>
        <SegmentGroupItemText :class="styles.title">{{ item }}</SegmentGroupItemText>
        <span :class="styles.description">{{ description }}</span>
        <SegmentGroupItemControl />
        <SegmentGroupItemHiddenInput />
      </label>
    </SegmentGroupItem>
  </SegmentGroup>
</template>