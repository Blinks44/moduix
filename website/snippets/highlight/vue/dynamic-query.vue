<script setup lang="ts">
import { Highlight } from '@moduix/vue/highlight';
import { Input } from '@moduix/vue/input';
import { Text } from '@moduix/vue/text';
import { ref } from 'vue';
import styles from '@/components/examples/highlight/highlight-dynamic-query.module.css';

const query = ref('component');
</script>

<template>
  <div :class="styles.stack">
    <Input v-model="query" aria-label="Search text" placeholder="Search text..." />
    <Text>
      <Highlight
        :query="query"
        text="Choose a component from the list. Open its documentation to see examples, props, and keyboard controls."
      />
    </Text>
  </div>
</template>