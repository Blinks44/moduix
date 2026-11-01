import { createListCollection } from '@ark-ui/solid/collection';
import { Button } from '@moduix/solid/button';
import {
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
  ListboxRootProvider,
  useListbox,
} from '@moduix/solid/listbox';
import { Stack } from '@moduix/solid/stack';
import { For } from 'solid-js';

const priorities = createListCollection({
  items: [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Critical', value: 'critical' },
  ],
});

export default function RootProviderListboxDemo() {
  const listbox = useListbox({ collection: priorities });

  return (
    <Stack gap="3">
      <ListboxRootProvider value={listbox}>
        <ListboxLabel>Select priority</ListboxLabel>
        <ListboxContent>
          <For each={priorities.items}>
            {(item) => (
              <ListboxItem item={item}>
                <ListboxItemText>{item.label}</ListboxItemText>
                <ListboxItemIndicator />
              </ListboxItem>
            )}
          </For>
        </ListboxContent>
      </ListboxRootProvider>
      <div>
        <output>Selected: {listbox().value[0] ?? 'none'}</output>
        <Button onClick={() => listbox().setValue(['high'])}>Set to high</Button>
      </div>
    </Stack>
  );
}