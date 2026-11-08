<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    ComboboxClearTrigger,
    ComboboxContent,
    ComboboxControl,
    ComboboxInput,
    ComboboxLabel,
    ComboboxList,
    ComboboxOption,
    ComboboxPositioner,
    ComboboxRootProvider,
    ComboboxTrigger,
    useCombobox,
  } from '@moduix/svelte/combobox';

  const jobTitles = [
    { label: 'Designer', value: 'designer' },
    { label: 'Developer', value: 'developer' },
    { label: 'Product Manager', value: 'product-manager' },
  ];
  const collection = createListCollection({ items: jobTitles });
  const id = $props.id();
  const combobox = useCombobox({ id, collection });
</script>

<ComboboxRootProvider value={combobox}>
  <ComboboxLabel>Job title</ComboboxLabel>
  <ComboboxControl>
    <ComboboxInput />
    <ComboboxClearTrigger aria-label="Clear selection" />
    <ComboboxTrigger aria-label="Open options" />
  </ComboboxControl>
  <ComboboxPositioner>
    <ComboboxContent>
      <ComboboxList>
        {#each collection.items as item (item.value)}
          <ComboboxOption {item}>{item.label}</ComboboxOption>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </ComboboxPositioner>
</ComboboxRootProvider>