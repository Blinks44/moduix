<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuIndicator,
  MenuItemIndicator,
  MenuItemText,
  MenuPositioner,
  MenuTrigger,
  MenuViewport,
} from '@moduix/vue/menu';
import { ref } from 'vue';
import styles from '@/components/examples/menu/menu-checkbox-items.module.css';

const showToolbar = ref(true);
const showSidebar = ref(false);
const showStatusBar = ref(true);
const showLineNumbers = ref(true);
</script>

<template>
  <Menu :close-on-select="false">
    <MenuTrigger as-child>
      <Button>View <MenuIndicator /></Button>
    </MenuTrigger>
    <MenuPositioner>
      <MenuContent :class="styles.content">
        <MenuViewport>
          <MenuCheckboxItem v-model:checked="showToolbar" value="toolbar">
            <MenuItemIndicator /><MenuItemText>Show Toolbar</MenuItemText>
          </MenuCheckboxItem>
          <MenuCheckboxItem v-model:checked="showSidebar" value="sidebar">
            <MenuItemIndicator /><MenuItemText>Show Sidebar</MenuItemText>
          </MenuCheckboxItem>
          <MenuCheckboxItem v-model:checked="showStatusBar" value="status-bar">
            <MenuItemIndicator /><MenuItemText>Show Status Bar</MenuItemText>
          </MenuCheckboxItem>
          <MenuCheckboxItem v-model:checked="showLineNumbers" value="line-numbers">
            <MenuItemIndicator /><MenuItemText>Show Line Numbers</MenuItemText>
          </MenuCheckboxItem>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</template>