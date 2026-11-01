<script setup lang="ts">
import { JsonTreeView, JsonTreeViewTree } from '@moduix/vue/json-tree-view';
import styles from '@/components/examples/json-tree-view/json-tree-view-custom-value-rendering.module.css';

const release = {
  name: '@moduix/react',
  repository: 'https://github.com/moduix/moduix',
  docs: 'https://moduix.dev/docs/json-tree-view',
  version: '3.2.0',
};

// String values arrive with their quotes, for example `"https://…"`.
const toUrl = (value: unknown) =>
  typeof value === 'string' && value.startsWith('"https://') ? value.slice(1, -1) : undefined;
</script>

<template>
  <JsonTreeView :data="release" :default-expanded-depth="1">
    <JsonTreeViewTree>
      <template #renderValue="{ node }">
        <a
          v-if="node.type === 'text' && toUrl(node.value)"
          :href="toUrl(node.value)"
          target="_blank"
          rel="noreferrer"
          :class="styles.link"
        >
          {{ node.value }}
        </a>
        <template v-else>{{ node.type === 'text' ? node.value : '' }}</template>
      </template>
    </JsonTreeViewTree>
  </JsonTreeView>
</template>