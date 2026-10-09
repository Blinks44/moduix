<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@moduix/vue/tabs';

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
</script>

<template>
  <Tabs default-value="overview">
    <TabsList>
      <TabsTrigger v-for="item in items" :key="item.value" :value="item.value" as-child>
        <a :href="`#${item.value}`">{{ item.title }}</a>
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="item in items" :key="item.value" :value="item.value">
      <span :id="item.value">{{ item.content }}</span>
    </TabsContent>
  </Tabs>
</template>