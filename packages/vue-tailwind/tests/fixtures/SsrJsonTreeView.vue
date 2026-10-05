<script setup lang="ts">
import { JsonTreeView, JsonTreeViewTree } from '../../src/components/json-tree-view';
const data = {
  release: {
    status: 'ready',
    version: '2.3.0',
  },
};
</script>
<template>
  <JsonTreeView :data="data" :default-expanded-depth="1">
    <JsonTreeViewTree />
  </JsonTreeView>
</template>