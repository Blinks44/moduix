<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection';
import { useFilter } from '@ark-ui/vue/locale';
import { Button } from '@moduix/vue/button';
import {
  CommandPalette,
  CommandPaletteCombobox,
  CommandPaletteEmpty,
  CommandPaletteFooter,
  CommandPaletteItem,
  CommandPaletteItemDescription,
  CommandPaletteItemGroup,
  CommandPaletteItemGroupLabel,
  CommandPaletteItemIcon,
  CommandPaletteItemLabel,
  CommandPaletteItemMeta,
  CommandPaletteItemText,
  CommandPaletteKbd,
  CommandPaletteList,
  CommandPalettePanel,
  CommandPaletteSearch,
  CommandPaletteTrigger,
} from '@moduix/vue/command-palette';
import { ref } from 'vue';
import styles from '@/components/examples/command-palette/command-palette-item-actions.module.css';

const lastAction = ref('No command executed yet.');
const commandPaletteItems = [
  {
    id: 'new-project',
    section: 'Create',
    label: 'New project',
    description: 'Start a blank workspace',
    shortcut: 'N',
    icon: '＋',
  },
  {
    id: 'recent',
    section: 'Navigate',
    label: 'Open recent work',
    description: 'Jump back to a recently edited file',
    shortcut: 'R',
    icon: '↗',
  },
  {
    id: 'favorites',
    section: 'Navigate',
    label: 'View favorites',
    description: 'Show pinned dashboards and docs',
    shortcut: 'F',
    icon: '★',
  },
  {
    id: 'settings',
    section: 'System',
    label: 'Notification settings',
    description: 'Tune email and product alerts',
    icon: '•',
  },
];
const actionItems = commandPaletteItems.map((item) => ({
  ...item,
  onSelect: () => (lastAction.value = `Executed: ${item.label}`),
}));
const filterOptions = useFilter({ sensitivity: 'base' });
const { collection, filter } = useListCollection({
  initialItems: actionItems,
  itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
  itemToValue: (item) => item.id,
  filter: (itemText, filterText) => filterOptions.value.contains(itemText, filterText),
  groupBy: (item) => item.section,
});
const handleOpenChange = (details: { open: boolean }) => {
  if (!details.open) filter('');
};
const handleSelect = (details: { itemValue: string }) => {
  actionItems.find((item) => item.id === details.itemValue)?.onSelect();
};
</script>

<template>
  <CommandPalette aria-label="Command palette with actions" @open-change="handleOpenChange">
    <CommandPaletteTrigger as-child>
      <Button>Open actions palette</Button>
    </CommandPaletteTrigger>
    <CommandPalettePanel :class="styles.highlightPalette">
      <CommandPaletteCombobox
        :collection="collection"
        @input-value-change="filter($event.inputValue)"
        @select="handleSelect"
      >
        <CommandPaletteSearch placeholder="Search and run commands..." />
        <CommandPaletteList>
          <CommandPaletteEmpty>No commands found.</CommandPaletteEmpty>
          <CommandPaletteItemGroup v-for="[section, items] in collection.group()" :key="section">
            <CommandPaletteItemGroupLabel>{{ section }}</CommandPaletteItemGroupLabel>
            <CommandPaletteItem v-for="item in items" :key="item.id" :item="item">
              <CommandPaletteItemIcon>{{ item.icon }}</CommandPaletteItemIcon>
              <CommandPaletteItemText>
                <CommandPaletteItemLabel>{{ item.label }}</CommandPaletteItemLabel>
                <CommandPaletteItemDescription>{{
                  item.description
                }}</CommandPaletteItemDescription>
              </CommandPaletteItemText>
              <CommandPaletteItemMeta v-if="item.shortcut">{{
                item.shortcut
              }}</CommandPaletteItemMeta>
            </CommandPaletteItem>
          </CommandPaletteItemGroup>
        </CommandPaletteList>
        <CommandPaletteFooter>
          <span><CommandPaletteKbd>Enter</CommandPaletteKbd> run</span>
        </CommandPaletteFooter>
      </CommandPaletteCombobox>
    </CommandPalettePanel>
  </CommandPalette>
  <output>Last action: {{ lastAction }}</output>
</template>