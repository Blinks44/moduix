<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import CheckIcon from '@lucide/svelte/icons/check';
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import XIcon from '@lucide/svelte/icons/x';
  import { CloseButton } from '@moduix/svelte/close-button';
  import {
    Select,
    SelectClearTrigger,
    SelectContent,
    SelectControl,
    SelectHiddenSelect,
    SelectIndicator,
    SelectItem,
    SelectItemGroup,
    SelectItemGroupLabel,
    SelectItemIndicator,
    SelectItemText,
    SelectLabel,
    SelectPositioner,
    SelectTrigger,
    SelectValueText,
  } from '@moduix/svelte/select';

  const fruits = createListCollection({
    items: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Blueberry', value: 'blueberry' },
    ],
  });
</script>

<Select collection={fruits}>
  <SelectLabel>Choose fruit</SelectLabel>
  <SelectControl>
    <SelectTrigger><SelectValueText placeholder="Select an option" /></SelectTrigger>
    <SelectClearTrigger aria-label="Clear selection">
      {#snippet asChild(props)}
        <CloseButton {...props()}><XIcon strokeWidth={3} /></CloseButton>
      {/snippet}
    </SelectClearTrigger>
    <SelectIndicator><ChevronsUpDownIcon strokeWidth={3} /></SelectIndicator>
  </SelectControl>
  <SelectPositioner>
    <SelectContent>
      <SelectItemGroup>
        <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
        {#each fruits.items as item (item.value)}
          <SelectItem {item}>
            <SelectItemText>{item.label}</SelectItemText>
            <SelectItemIndicator><CheckIcon strokeWidth={3} /></SelectItemIndicator>
          </SelectItem>
        {/each}
      </SelectItemGroup>
    </SelectContent>
  </SelectPositioner>
  <SelectHiddenSelect />
</Select>