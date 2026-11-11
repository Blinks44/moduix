<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection';
  import type {
    ComboboxInputValueChangeDetails,
    ComboboxOpenChangeDetails,
  } from '@ark-ui/svelte/combobox';
  import { useFilter } from '@ark-ui/svelte/locale';
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
  } from '@moduix/svelte/combobox';

  type IssueLabel = { label: string; value: string; created?: boolean };
  const createOptionValue = '__create-option__';
  const issueLabels: IssueLabel[] = [
    { label: 'Bug', value: 'bug' },
    { label: 'Feature', value: 'feature' },
    { label: 'Enhancement', value: 'enhancement' },
    { label: 'Documentation', value: 'documentation' },
  ];
  const filterOptions = useFilter({ sensitivity: 'base' });
  const { collection, filter, remove, update, upsert } = useListCollection({
    initialItems: issueLabels,
    filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
  });
  let inputValue = $state('');
  let value = $state<string[]>([]);

  function handleInputValueChange(details: ComboboxInputValueChangeDetails) {
    const nextInputValue = details.inputValue;
    if (details.reason === 'input-change' || details.reason === 'item-select') {
      const hasExactMatch = collection().items.some(
        (item) => item.label.toLowerCase() === nextInputValue.toLowerCase(),
      );
      if (nextInputValue.trim() && !hasExactMatch) {
        upsert(createOptionValue, { label: nextInputValue, value: createOptionValue });
      } else {
        remove(createOptionValue);
      }
      filter(nextInputValue);
    }
    inputValue = nextInputValue;
  }

  function handleValueChange(details: { value: string[] }) {
    value = details.value.map((item) => (item === createOptionValue ? inputValue : item));
    if (details.value.includes(createOptionValue)) {
      update(createOptionValue, {
        label: inputValue,
        value: inputValue,
        created: true,
      });
    }
  }

  function handleOpenChange(details: ComboboxOpenChangeDetails) {
    if (details.reason === 'trigger-click') filter('');
  }
</script>

<Combobox
  collection={collection()}
  bind:inputValue={() => inputValue, () => {}}
  bind:value={() => value, () => {}}
  allowCustomValue
  onInputValueChange={handleInputValueChange}
  onOpenChange={handleOpenChange}
  onValueChange={handleValueChange}
>
  <ComboboxLabel>Issue label</ComboboxLabel>
  <ComboboxControl>
    <ComboboxInput placeholder="e.g. Accessibility" />
    <ComboboxClearTrigger aria-label="Clear selection" />
    <ComboboxTrigger aria-label="Open options" />
  </ComboboxControl>
  <ComboboxPositioner>
    <ComboboxContent>
      <ComboboxList>
        {#each collection().items as item (item.value)}
          <ComboboxItem {item}>
            <ComboboxItemText>
              {item.value === createOptionValue
                ? 'Create "' + item.label + '"'
                : item.label + (item.created ? ' (new)' : '')}
            </ComboboxItemText>
            <ComboboxItemIndicator />
          </ComboboxItem>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </ComboboxPositioner>
</Combobox>