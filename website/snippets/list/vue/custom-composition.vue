<script setup lang="ts">
import { List, ListItem } from '@moduix/vue/list';
import styles from '@/components/examples/list/list-custom-composition.module.css';
</script>

<template>
  <List>
    <ListItem as-child>
      <li :class="styles.item">Custom items can own their local styling.</li>
    </ListItem>
    <ListItem as-child>
      <li :class="styles.item">List still provides its spacing and marker contract.</li>
    </ListItem>
    <ListItem as-child>
      <li :class="styles.item">asChild keeps the semantic li contract for custom items.</li>
    </ListItem>
  </List>
</template>