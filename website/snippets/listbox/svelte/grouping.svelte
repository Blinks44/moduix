<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    Listbox,
    ListboxContent,
    ListboxItem,
    ListboxItemGroup,
    ListboxItemGroupLabel,
    ListboxItemIndicator,
    ListboxItemText,
    ListboxLabel,
  } from '@moduix/svelte/listbox';

  const regions = createListCollection({
    items: [
      { label: 'New York', value: 'nyc', region: 'North America' },
      { label: 'Los Angeles', value: 'lax', region: 'North America' },
      { label: 'Toronto', value: 'yyz', region: 'North America' },
      { label: 'London', value: 'lhr', region: 'Europe' },
      { label: 'Paris', value: 'cdg', region: 'Europe' },
      { label: 'Berlin', value: 'ber', region: 'Europe' },
      { label: 'Tokyo', value: 'nrt', region: 'Asia Pacific' },
      { label: 'Singapore', value: 'sin', region: 'Asia Pacific' },
      { label: 'Sydney', value: 'syd', region: 'Asia Pacific' },
    ],
    groupBy: (item) => item.region,
  });
</script>

<Listbox collection={regions}>
  <ListboxLabel>Select region</ListboxLabel>
  <ListboxContent>
    {#each regions.group() as [region, items] (region)}
      <ListboxItemGroup id={region}>
        <ListboxItemGroupLabel>{region}</ListboxItemGroupLabel>
        {#each items as item (item.value)}
          <ListboxItem {item}>
            <ListboxItemText>{item.label}</ListboxItemText>
            <ListboxItemIndicator />
          </ListboxItem>
        {/each}
      </ListboxItemGroup>
    {/each}
  </ListboxContent>
</Listbox>