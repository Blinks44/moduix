<script setup lang="ts">
import { Grid3X3, Map, MapPin, TrafficCone } from '@lucide/vue';
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

const showSearch = ref(true);
const showGrid = ref(false);
const showLabels = ref(true);
const showTraffic = ref(false);
</script>

<template>
  <Menu :close-on-select="false">
    <MenuTrigger as-child>
      <Button>View <MenuIndicator /></Button>
    </MenuTrigger>
    <MenuPositioner>
      <MenuContent>
        <MenuViewport>
          <MenuCheckboxItem v-model:checked="showSearch" value="search" indicator="end">
            <MenuItemText><Map />Search</MenuItemText>
            <MenuItemIndicator />
          </MenuCheckboxItem>
          <MenuCheckboxItem v-model:checked="showGrid" value="grid" indicator="end">
            <MenuItemText><Grid3X3 />Grid</MenuItemText>
            <MenuItemIndicator />
          </MenuCheckboxItem>
          <MenuCheckboxItem v-model:checked="showLabels" value="labels" indicator="end">
            <MenuItemText><MapPin />Place Labels</MenuItemText>
            <MenuItemIndicator />
          </MenuCheckboxItem>
          <MenuCheckboxItem v-model:checked="showTraffic" value="traffic" indicator="end">
            <MenuItemText><TrafficCone />Traffic</MenuItemText>
            <MenuItemIndicator />
          </MenuCheckboxItem>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</template>