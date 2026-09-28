<script setup lang="ts">
import { List, ListItem } from '@moduix/vue/list';
</script>

<template>
  <List as="ol" :start="3">
    <ListItem>Prepare the release notes.</ListItem>
    <ListItem>Publish the package.</ListItem>
    <ListItem>Announce the release.</ListItem>
  </List>
</template>