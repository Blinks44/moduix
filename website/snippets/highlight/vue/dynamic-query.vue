<script setup lang="ts">
import { Highlight } from '@moduix/vue/highlight';
import { Input } from '@moduix/vue/input';
import { Stack } from '@moduix/vue/stack';
import { Text } from '@moduix/vue/text';
import { ref } from 'vue';

const query = ref('component');
</script>

<template>
  <Stack gap="4">
    <Input v-model="query" aria-label="Search text" placeholder="Search text..." />
    <Text>
      <Highlight
        :query="query"
        text="Choose a component from the list. Open its documentation to see examples, props, and keyboard controls."
      />
    </Text>
  </Stack>
</template>