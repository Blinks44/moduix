<script setup lang="ts">
import {
  Card,
  CardAction,
  CardBackground,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardLink,
  CardMedia,
  CardTitle,
} from '../src';
</script>

<template>
  <Card size="sm" variant="elevated" aria-label="Release health">
    <CardBackground aria-hidden="true"><img alt="" src="/background.jpg" /></CardBackground>
    <CardMedia><img alt="Warehouse" src="/warehouse.jpg" /></CardMedia>
    <CardHeader>
      <CardTitle as-child><h2>Release health</h2></CardTitle>
      <CardDescription>Summary for the current production rollout.</CardDescription>
      <CardAction><button type="button">Open menu</button></CardAction>
    </CardHeader>
    <CardBody class="px-2">98.4% successful sessions</CardBody>
    <CardFooter><CardLink href="/reports/release-health">View report</CardLink></CardFooter>
  </Card>
</template>