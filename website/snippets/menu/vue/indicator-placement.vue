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
  MenuItemTextContent,
  MenuItemTextIcon,
  MenuItemTextLabel,
  MenuPositioner,
  MenuTrigger,
  MenuViewport,
} from '@moduix/vue/menu';
import { ref } from 'vue';
import styles from '@/components/examples/menu/menu-indicator-placement.module.css';

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
      <MenuContent :class="styles.content">
        <MenuViewport>
          <MenuCheckboxItem v-model:checked="showSearch" value="search" indicator="end">
            <MenuItemText>
              <MenuItemTextContent
                ><MenuItemTextIcon><Map /></MenuItemTextIcon
                ><MenuItemTextLabel>Search</MenuItemTextLabel></MenuItemTextContent
              >
            </MenuItemText>
            <MenuItemIndicator />
          </MenuCheckboxItem>
          <MenuCheckboxItem v-model:checked="showGrid" value="grid" indicator="end">
            <MenuItemText>
              <MenuItemTextContent
                ><MenuItemTextIcon><Grid3X3 /></MenuItemTextIcon
                ><MenuItemTextLabel>Grid</MenuItemTextLabel></MenuItemTextContent
              >
            </MenuItemText>
            <MenuItemIndicator />
          </MenuCheckboxItem>
          <MenuCheckboxItem v-model:checked="showLabels" value="labels" indicator="end">
            <MenuItemText>
              <MenuItemTextContent
                ><MenuItemTextIcon><MapPin /></MenuItemTextIcon
                ><MenuItemTextLabel>Place Labels</MenuItemTextLabel></MenuItemTextContent
              >
            </MenuItemText>
            <MenuItemIndicator />
          </MenuCheckboxItem>
          <MenuCheckboxItem v-model:checked="showTraffic" value="traffic" indicator="end">
            <MenuItemText>
              <MenuItemTextContent
                ><MenuItemTextIcon><TrafficCone /></MenuItemTextIcon
                ><MenuItemTextLabel>Traffic</MenuItemTextLabel></MenuItemTextContent
              >
            </MenuItemText>
            <MenuItemIndicator />
          </MenuCheckboxItem>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</template>