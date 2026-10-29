<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import {
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRootProvider,
  TabsTrigger,
  useTabs,
} from '@moduix/vue/tabs';

const items = [
  {
    value: 'overview',
    title: 'Overview',
    content:
      'Review project status, team velocity, workloads and activity highlights in one place.',
  },
  {
    value: 'projects',
    title: 'Projects',
    content:
      'Track active workstreams, owners and milestones across all departments and align delivery timelines.',
  },
  {
    value: 'account',
    title: 'Account',
    content: 'Manage personal settings, team settings, notifications and access preferences.',
  },
];

const tabs = useTabs({ defaultValue: 'overview' });
</script>

<template>
  <Stack align="center" gap="3">
    <TabsRootProvider :value="tabs">
      <TabsList>
        <TabsTrigger v-for="item in items" :key="item.value" :value="item.value">
          {{ item.title }}
        </TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent v-for="item in items" :key="item.value" :value="item.value">
        {{ item.content }}
      </TabsContent>
    </TabsRootProvider>
    <output>Selected: {{ tabs.value ?? 'none' }}</output>
  </Stack>
</template>