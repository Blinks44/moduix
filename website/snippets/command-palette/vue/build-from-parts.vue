<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection';
import { useFilter } from '@ark-ui/vue/locale';
import { Search as SearchIcon, X as XIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import {
  CommandPalette,
  CommandPaletteBackdrop,
  CommandPaletteClearTrigger,
  CommandPaletteCombobox,
  CommandPaletteContent,
  CommandPaletteControl,
  CommandPaletteEmpty,
  CommandPaletteInput,
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
  CommandPalettePositioner,
  CommandPaletteTrigger,
} from '@moduix/vue/command-palette';
import styles from '@/components/examples/command-palette/command-palette-build-from-parts.module.css';

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
    id: 'invite-team',
    section: 'Create',
    label: 'Invite teammates',
    description: 'Send access to the current organization',
    shortcut: 'I',
    icon: '＋',
  },
  {
    id: 'recent',
    section: 'Navigate',
    label: 'Open recent work',
    description: 'Jump back to a recently edited file',
    shortcut: '↗',
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
    id: 'notifications',
    section: 'System',
    label: 'Notification settings',
    description: 'Tune email and product alerts',
    icon: '•',
  },
  {
    id: 'release-notes',
    section: 'System',
    label: 'Release notes',
    description: 'Read the latest product changes',
    icon: '↗',
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
  if (!details.open) filter('');
};
</script>

<template>
  <CommandPalette aria-label="Command palette" @open-change="handleOpenChange">
    <CommandPaletteTrigger as-child>
      <Button>Open palette</Button>
    </CommandPaletteTrigger>
    <CommandPaletteBackdrop />
    <CommandPalettePositioner>
      <CommandPaletteContent>
        <CommandPaletteCombobox
          :collection="collection"
          @input-value-change="filter($event.inputValue)"
        >
          <CommandPaletteControl>
            <SearchIcon aria-hidden="true" :class="styles.searchIcon" />
            <CommandPaletteInput
              aria-label="Search commands"
              placeholder="Search commands, pages, and settings..."
            />
            <CommandPaletteClearTrigger>
              <XIcon :stroke-width="3" />
            </CommandPaletteClearTrigger>
          </CommandPaletteControl>
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
          <div :class="styles.footer">
            <span><CommandPaletteKbd>Enter</CommandPaletteKbd> run</span>
            <span><CommandPaletteKbd>Esc</CommandPaletteKbd> close</span>
          </div>
        </CommandPaletteCombobox>
      </CommandPaletteContent>
    </CommandPalettePositioner>
  </CommandPalette>
</template>