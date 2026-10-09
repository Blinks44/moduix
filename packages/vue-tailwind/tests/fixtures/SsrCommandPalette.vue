<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import {
  CommandPalette,
  CommandPalettePanel,
  CommandPaletteTitle,
  CommandPaletteCombobox,
  CommandPaletteSearch,
  CommandPaletteList,
  CommandPaletteItem,
} from '../../src/components/command-palette';
const collection = createListCollection({ items: [{ label: 'Open settings', value: 'settings' }] });
const itemValue = collection.items[0];
</script>
<template>
  <CommandPalette default-open aria-label="Server palette" :portalled="false">
    <CommandPalettePanel>
      <CommandPaletteTitle>Server palette</CommandPaletteTitle>
      <CommandPaletteCombobox :collection="collection">
        <CommandPaletteSearch />
        <CommandPaletteList>
          <CommandPaletteItem :item="itemValue">Open settings</CommandPaletteItem>
        </CommandPaletteList>
      </CommandPaletteCombobox>
    </CommandPalettePanel>
  </CommandPalette>
</template>