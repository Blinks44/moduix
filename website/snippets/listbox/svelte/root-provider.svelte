<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import { Button } from '@moduix/svelte/button';
  import {
    ListboxContent,
    ListboxItem,
    ListboxItemIndicator,
    ListboxItemText,
    ListboxLabel,
    ListboxRootProvider,
    useListbox,
  } from '@moduix/svelte/listbox';
  import { Stack } from '@moduix/svelte/stack';

  const priorities = createListCollection({
    items: [
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
      { label: 'High', value: 'high' },
      { label: 'Critical', value: 'critical' },
    ],
  });
  const id = $props.id();
  const listbox = useListbox({ id, collection: priorities });
</script>

<Stack gap="3">
  <ListboxRootProvider value={listbox}>
    <ListboxLabel>Select priority</ListboxLabel>
    <ListboxContent>
      {#each priorities.items as item (item.value)}
        <ListboxItem {item}>
          <ListboxItemText>{item.label}</ListboxItemText>
          <ListboxItemIndicator />
        </ListboxItem>
      {/each}
    </ListboxContent>
  </ListboxRootProvider>
  <div data-preview-meta style="place-self: center">
    <output>Selected: {listbox().value[0] ?? 'none'}</output>
    <Button type="button" onclick={() => listbox().setValue(['high'])}>Set to high</Button>
  </div>
</Stack>