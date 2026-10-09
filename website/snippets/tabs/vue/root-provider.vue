<script setup lang="ts">
import { TabsContent, TabsList, TabsRootProvider, TabsTrigger, useTabs } from '@moduix/vue/tabs';
import styles from '@/components/examples/tabs/tabs-root-provider.module.css';

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
  <div :class="styles.root">
    <TabsRootProvider :value="tabs">
      <TabsList>
        <TabsTrigger v-for="item in items" :key="item.value" :value="item.value">
          {{ item.title }}
        </TabsTrigger>
      </TabsList>
      <TabsContent v-for="item in items" :key="item.value" :value="item.value">
        {{ item.content }}
      </TabsContent>
    </TabsRootProvider>
    <output>Selected: {{ tabs.value ?? 'none' }}</output>
  </div>
</template>