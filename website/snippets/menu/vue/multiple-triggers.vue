<script setup lang="ts">
import { Map } from '@lucide/vue';
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuTrigger,
  MenuViewport,
} from '@moduix/vue/menu';
import styles from '@/components/examples/menu/menu-multiple-triggers.module.css';

const messages = [
  { id: '1', sender: 'Alice Johnson', preview: 'Hey, can you review the latest PR?' },
  { id: '2', sender: 'Bob Smith', preview: 'Meeting notes from today are attached.' },
  { id: '3', sender: 'Carol Davis', preview: 'The deploy finished successfully!' },
];
</script>

<template>
  <Menu>
    <div :class="styles.triggers">
      <MenuTrigger
        v-for="message in messages"
        :key="message.id"
        :value="message.id"
        :aria-label="`Open actions for ${message.sender}`"
      >
        <Map />
      </MenuTrigger>
    </div>
    <MenuPositioner>
      <MenuContent :class="styles.content">
        <MenuViewport>
          <MenuItem value="reply">Reply</MenuItem>
          <MenuItem value="forward">Forward</MenuItem>
          <MenuItem value="archive">Archive</MenuItem>
          <MenuItem value="delete" tone="destructive">Delete</MenuItem>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</template>