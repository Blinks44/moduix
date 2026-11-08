<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    Listbox,
    ListboxContent,
    ListboxItem,
    ListboxItemIndicator,
    ListboxItemText,
    ListboxLabel,
  } from '@moduix/svelte/listbox';

  const plans = createListCollection({
    items: [
      { label: 'Free', value: 'free' },
      { label: 'Pro', value: 'pro' },
      { label: 'Enterprise', value: 'enterprise', disabled: true },
      { label: 'Custom', value: 'custom' },
    ],
  });
</script>

<Listbox collection={plans}>
  <ListboxLabel>Select plan</ListboxLabel>
  <ListboxContent>
    {#each plans.items as item (item.value)}
      <ListboxItem {item}>
        <ListboxItemText>{item.label}</ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
    {/each}
  </ListboxContent>
</Listbox>