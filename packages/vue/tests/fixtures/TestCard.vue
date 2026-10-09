<script setup lang="ts">
import { Card, CardBody, CardHeader, CardTitle } from '../../src';
</script>

<template>
  <Card as-child size="lg" variant="subtle" class="consumer-card">
    <a href="/reports/release-health" aria-label="Open release report">
      <CardHeader><CardTitle>Release health</CardTitle></CardHeader>
      <CardBody>98.4% successful sessions</CardBody>
    </a>
  </Card>
</template>