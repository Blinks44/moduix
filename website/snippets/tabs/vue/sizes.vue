<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { Tabs, TabsIndicator, TabsList, TabsTrigger } from '@moduix/vue/tabs';

const sizes = ['sm', 'md', 'lg'] as const;
const tabs = ['Overview', 'Projects', 'Account'];
</script>

<template>
  <Stack align="flex-start" gap="3">
    <Tabs v-for="size in sizes" :key="size" default-value="Overview" :size="size">
      <TabsList :aria-label="`Sections, ${size}`">
        <TabsTrigger v-for="tab in tabs" :key="tab" :value="tab">{{ tab }}</TabsTrigger>
        <TabsIndicator />
      </TabsList>
    </Tabs>
  </Stack>
</template>