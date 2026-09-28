<script setup lang="ts">
import { List, ListItem } from '@moduix/vue/list';
</script>

<template>
  <List as-child>
    <ul aria-label="Release tasks">
      <ListItem>Prepare the release notes.</ListItem>
      <ListItem>Publish the package.</ListItem>
      <ListItem>Announce the release.</ListItem>
    </ul>
  </List>
</template>