<script setup lang="ts">
import { List, ListItem } from '@moduix/vue/list';
import styles from '@/components/examples/list/list-tone.module.css';
</script>

<template>
  <div :class="styles.root">
    <List tone="default">
      <ListItem>Default list tone</ListItem>
    </List>
    <List tone="muted">
      <ListItem>Muted list tone</ListItem>
    </List>
    <List tone="subtle">
      <ListItem>Subtle list tone</ListItem>
    </List>
    <List tone="primary">
      <ListItem>Primary list tone</ListItem>
    </List>
    <List tone="destructive">
      <ListItem>Destructive list tone</ListItem>
    </List>
  </div>
</template>