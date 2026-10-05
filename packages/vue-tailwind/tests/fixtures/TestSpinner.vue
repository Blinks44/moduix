<script setup lang="ts">
import { Spinner } from '../../src';
</script>

<template>
  <Spinner as-child size="lg" aria-label="Loading report">
    <span data-testid="spinner-host">Loading report</span>
  </Spinner>
</template>