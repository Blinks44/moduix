<script setup lang="ts">
import { JsonTreeView, JsonTreeViewTree } from '@moduix/vue/json-tree-view';

const response = {
  checks: ['accessibility', 'visual-regression', 'type-check', 'unit-tests', 'documentation-build'],
  message:
    'This release includes a detailed changelog with compatibility notes for application teams and maintainers.',
  status: 'published',
};
</script>

<template>
  <JsonTreeView
    :collapse-strings-after-length="36"
    :data="response"
    :default-expanded-depth="1"
    :max-preview-items="3"
  >
    <JsonTreeViewTree />
  </JsonTreeView>
</template>