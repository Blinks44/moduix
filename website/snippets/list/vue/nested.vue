<script setup lang="ts">
import { List, ListItem } from '@moduix/vue/list';
</script>

<template>
  <List>
    <ListItem>
      Prepare the release
      <List as="ol">
        <ListItem>Update the changelog.</ListItem>
        <ListItem>Bump the package versions.</ListItem>
      </List>
    </ListItem>
    <ListItem>Publish the packages.</ListItem>
  </List>
</template>