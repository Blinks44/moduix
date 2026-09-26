<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection';
import { useFilter } from '@ark-ui/vue/locale';
import { Button } from '@moduix/vue/button';
import {
  CommandPalette,
  CommandPaletteCombobox,
  CommandPaletteEmpty,
  CommandPaletteItem,
  CommandPaletteItemDescription,
  CommandPaletteItemGroup,
  CommandPaletteItemGroupLabel,
  CommandPaletteItemIcon,
  CommandPaletteItemLabel,
  CommandPaletteItemMeta,
  CommandPaletteItemText,
  CommandPaletteList,
  CommandPalettePanel,
  CommandPaletteSearch,
  CommandPaletteTrigger,
} from '@moduix/vue/command-palette';
import { ref } from 'vue';
import styles from '@/components/examples/command-palette/command-palette-controlled-open-state.module.css';

const open = ref(false);
const commandItems = [
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
const filterOptions = useFilter({ sensitivity: 'base' });
const { collection, filter } = useListCollection({
  initialItems: commandItems,
  itemToString: (item) => `${item.label} ${item.description} ${item.section}`,
  itemToValue: (item) => item.id,
  filter: (itemText, filterText) => filterOptions.value.contains(itemText, filterText),
  groupBy: (item) => item.section,
});
const handleOpenChange = (details: { open: boolean }) => {
  open.value = details.open;
  if (!details.open) filter('');
};
</script>

<template>
  <CommandPalette
    v-model:open="open"
    aria-label="Controlled command palette"
    @open-change="handleOpenChange"
  >
    <CommandPaletteTrigger as-child>
      <Button>Search actions</Button>
    </CommandPaletteTrigger>
    <CommandPalettePanel :class="styles.compactPalette">
      <CommandPaletteCombobox
        :collection="collection"
        @input-value-change="filter($event.inputValue)"
      >
        <CommandPaletteSearch placeholder="Search controlled commands..." />
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
      </CommandPaletteCombobox>
    </CommandPalettePanel>
  </CommandPalette>
</template>