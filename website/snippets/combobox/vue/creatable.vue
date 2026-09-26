<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection';
import type {
  ComboboxInputValueChangeDetails,
  ComboboxOpenChangeDetails,
} from '@ark-ui/vue/combobox';
import { useFilter } from '@ark-ui/vue/locale';
import {
  Combobox,
  ComboboxClearTrigger,
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
import { ref } from 'vue';
import styles from '@/components/examples/combobox/component-creatable.module.css';

type IssueLabel = { label: string; value: string; created?: boolean };
const createOptionValue = '__create-option__';
const issueLabels: IssueLabel[] = [
  { label: 'Bug', value: 'bug' },
  { label: 'Feature', value: 'feature' },
  { label: 'Enhancement', value: 'enhancement' },
  { label: 'Documentation', value: 'documentation' },
];
const filterOptions = useFilter({ sensitivity: 'base' });
const state = useListCollection({
  initialItems: issueLabels,
  filter: (itemText, filterText) => filterOptions.value.contains(itemText, filterText),
});
const { collection, filter, remove, update, upsert } = state;
const inputValue = ref('');
const value = ref<string[]>([]);

function handleInputValueChange(details: ComboboxInputValueChangeDetails) {
  const nextInputValue = details.inputValue;
  if (details.reason === 'input-change' || details.reason === 'item-select') {
    const hasExactMatch = collection.value.items.some(
      (item) => item.label.toLowerCase() === nextInputValue.toLowerCase(),
    );
    if (nextInputValue.trim() && !hasExactMatch) {
      upsert(createOptionValue, { label: nextInputValue, value: createOptionValue });
    } else {
      remove(createOptionValue);
    }
    filter(nextInputValue);
  }
  inputValue.value = nextInputValue;
}

function handleValueChange(details: { value: string[] }) {
  value.value = details.value.map((item) => (item === createOptionValue ? inputValue.value : item));
  if (details.value.includes(createOptionValue)) {
    update(createOptionValue, {
      label: inputValue.value,
      value: inputValue.value,
      created: true,
    });
  }
}

function handleOpenChange(details: ComboboxOpenChangeDetails) {
  if (details.reason === 'trigger-click') filter('');
}
</script>

<template>
  <Combobox
    :collection="collection"
    :input-value="inputValue"
    :model-value="value"
    allow-custom-value
    @input-value-change="handleInputValueChange"
    @open-change="handleOpenChange"
    @value-change="handleValueChange"
  >
    <ComboboxLabel>Issue label</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput placeholder="e.g. Accessibility" />
      <ComboboxClearTrigger aria-label="Clear selection" />
      <ComboboxTrigger aria-label="Open options" />
    </ComboboxControl>
    <ComboboxPositioner>
      <ComboboxContent :class="styles.content">
        <ComboboxList>
          <ComboboxItem v-for="item in collection.items" :key="item.value" :item="item">
            <ComboboxItemText>
              {{
                item.value === createOptionValue
                  ? 'Create "' + item.label + '"'
                  : item.label + (item.created ? ' (new)' : '')
              }}
            </ComboboxItemText>
            <ComboboxItemIndicator />
          </ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPositioner>
  </Combobox>
</template>