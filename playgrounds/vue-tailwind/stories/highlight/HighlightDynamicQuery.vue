<script setup lang="ts">
import { ref } from 'vue';
import { Highlight } from '@/components/highlight';
import { Input } from '@/components/input';
import { Text } from '@/components/text';

const query = ref('component');
</script>

<template>
  <div class="grid w-[min(34rem,calc(100vw-2rem))] gap-4">
    <Input
      v-model="query"
      aria-label="Search text"
      class="w-full max-w-[18rem]"
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