<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection';
  import { useFilter } from '@ark-ui/svelte/locale';
  import CheckIcon from '@lucide/svelte/icons/check';
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import XIcon from '@lucide/svelte/icons/x';
  import { CloseButton } from '@moduix/svelte/close-button';
  import {
    Combobox,
    ComboboxClearTrigger,
    ComboboxContent,
    ComboboxControl,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxItemText,
    ComboboxLabel,
    ComboboxList,
    ComboboxPositioner,
    ComboboxTrigger,
  } from '@moduix/svelte/combobox';

  const fruits = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Mango', value: 'mango' },
  ];
  const filterOptions = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({
    initialItems: fruits,
    filter: (itemText, filterText) => filterOptions().contains(itemText, filterText),
  });
</script>

<Combobox collection={collection()} onInputValueChange={(details) => filter(details.inputValue)}>
  <ComboboxLabel>Choose fruit</ComboboxLabel>
  <ComboboxControl>
    <ComboboxInput placeholder="e.g. Mango" />
    <ComboboxClearTrigger aria-label="Clear selection">
      {#snippet asChild(props)}
        <CloseButton {...props()}><XIcon strokeWidth={3} /></CloseButton>
      {/snippet}
    </ComboboxClearTrigger>
    <ComboboxTrigger aria-label="Open options">
      <ChevronsUpDownIcon strokeWidth={3} />
    </ComboboxTrigger>
  </ComboboxControl>
  <ComboboxPositioner>
    <ComboboxContent>
      <ComboboxEmpty>No fruits found.</ComboboxEmpty>
      <ComboboxList>
        {#each collection().items as item (item.value)}
          <ComboboxItem {item}>
            <ComboboxItemText>{item.label}</ComboboxItemText>
            <ComboboxItemIndicator>
              <CheckIcon strokeWidth={3} />
            </ComboboxItemIndicator>
          </ComboboxItem>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </ComboboxPositioner>
</Combobox>