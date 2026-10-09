<script setup lang="ts">
import { JsonTreeView, JsonTreeViewTree } from '@moduix/vue/json-tree-view';

const deployment = {
  environment: 'production',
  release: {
    branch: 'main',
    commit: '0f4c9d7',
    status: 'ready',
  },
  services: ['docs', 'registry', 'website'],
};
</script>

<template>
  <JsonTreeView :data="deployment" :default-expanded-depth="2">
    <JsonTreeViewTree />
  </JsonTreeView>
</template>