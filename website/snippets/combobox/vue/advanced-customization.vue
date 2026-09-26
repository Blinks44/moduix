<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection';
import { useFilter } from '@ark-ui/vue/locale';
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxList,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/vue/combobox';
import styles from '@/components/examples/combobox/component-advanced-customization.module.css';

const developerResources = [
  { label: 'GitHub', href: 'https://github.com', value: 'github' },
  { label: 'Stack Overflow', href: 'https://stackoverflow.com', value: 'stack-overflow' },
  { label: 'MDN Web Docs', href: 'https://developer.mozilla.org', value: 'mdn' },
  { label: 'npm', href: 'https://www.npmjs.com', value: 'npm' },
  { label: 'TypeScript', href: 'https://www.typescriptlang.org', value: 'typescript' },
];
const filterOptions = useFilter({ sensitivity: 'base' });
const { collection, filter } = useListCollection({
  initialItems: developerResources,
  filter: (itemText, filterText) => filterOptions.value.contains(itemText, filterText),
});
</script>

<template>
  <Combobox
    :collection="collection"
    selection-behavior="preserve"
    @input-value-change="filter($event.inputValue)"
  >
    <ComboboxLabel>Developer resources</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput placeholder="e.g. GitHub" />
      <ComboboxTrigger aria-label="Open options" />
    </ComboboxControl>
    <ComboboxPositioner>
      <ComboboxContent :class="styles.content">
        <ComboboxList>
          <ComboboxItem v-for="item in collection.items" :key="item.value" :item="item" as-child>
            <a :href="item.href" target="_blank" rel="noreferrer">
              <ComboboxItemText>{{ item.label }}</ComboboxItemText>
              <ComboboxItemIndicator />
            </a>
          </ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPositioner>
  </Combobox>
</template>