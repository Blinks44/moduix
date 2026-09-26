<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Menu,
  MenuContent,
  MenuIndicator,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemIndicator,
  MenuItemText,
  MenuPositioner,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuTrigger,
  MenuViewport,
} from '@moduix/vue/menu';
import { ref } from 'vue';
import styles from '@/components/examples/menu/menu-radio-items.module.css';

const sortBy = ref('date');
</script>

<template>
  <Menu :close-on-select="false">
    <MenuTrigger as-child>
      <Button>Sort <MenuIndicator /></Button>
    </MenuTrigger>
    <MenuPositioner>
      <MenuContent :class="styles.content">
        <MenuViewport>
          <MenuItemGroup>
            <MenuItemGroupLabel>Sort By</MenuItemGroupLabel>
            <MenuRadioItemGroup v-model="sortBy">
              <MenuRadioItem value="name"
                ><MenuItemIndicator /><MenuItemText>Name</MenuItemText></MenuRadioItem
              >
              <MenuRadioItem value="date"
                ><MenuItemIndicator /><MenuItemText>Date Modified</MenuItemText></MenuRadioItem
              >
              <MenuRadioItem value="size"
                ><MenuItemIndicator /><MenuItemText>File Size</MenuItemText></MenuRadioItem
              >
              <MenuRadioItem value="type"
                ><MenuItemIndicator /><MenuItemText>File Type</MenuItemText></MenuRadioItem
              >
            </MenuRadioItemGroup>
          </MenuItemGroup>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</template>