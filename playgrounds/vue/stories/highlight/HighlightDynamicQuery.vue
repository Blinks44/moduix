<script setup lang="ts">
import { ref } from 'vue';
import { Highlight } from '@/components/highlight';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import styles from './Highlight.stories.module.css';

const query = ref('component');
</script>

<template>
  <div :class="styles.stack">
    <Input
      v-model="query"
      aria-label="Search text"
      :class="styles.field"
      placeholder="Search text..."
    />
    <Text>
      <Highlight
        :query="query"
        text="With Ark UI, you can build accessible, custom components. Each component is fully typed and works seamlessly with React, Solid, Svelte, and Vue."
      />
    </Text>
  </div>
</template>