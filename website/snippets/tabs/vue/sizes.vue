<script setup lang="ts">
import { Tabs, TabsIndicator, TabsList, TabsTrigger } from '@moduix/vue/tabs';
import styles from '@/components/examples/tabs/tabs-sizes.module.css';

const sizes = ['sm', 'md', 'lg'] as const;
const tabs = ['Overview', 'Projects', 'Account'];
</script>

<template>
  <div :class="styles.root">
    <Tabs v-for="size in sizes" :key="size" default-value="Overview" :size="size">
      <TabsList :aria-label="`Sections, ${size}`">
        <TabsTrigger v-for="tab in tabs" :key="tab" :value="tab">{{ tab }}</TabsTrigger>
        <TabsIndicator />
      </TabsList>
    </Tabs>
  </div>
</template>