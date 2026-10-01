<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@moduix/vue/toggle-group';
import styles from '@/components/examples/toggle-group/toggle-group-disabled.module.css';
</script>

<template>
  <div :class="styles.row">
    <ToggleGroup :default-value="['one']" aria-label="Disabled group" disabled>
      <ToggleGroupItem value="one">One</ToggleGroupItem>
      <ToggleGroupItem value="two">Two</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup :default-value="['one']" aria-label="Disabled item">
      <ToggleGroupItem value="one">One</ToggleGroupItem>
      <ToggleGroupItem value="two" disabled>Two</ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>