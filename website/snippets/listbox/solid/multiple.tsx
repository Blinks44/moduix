import { createListCollection } from '@ark-ui/solid/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
  ListboxValueText,
} from '@moduix/solid/listbox';
import { For } from 'solid-js';

const days = createListCollection({
  items: [
    { label: 'Monday', value: 'mon' },
    { label: 'Tuesday', value: 'tue' },
    { label: 'Wednesday', value: 'wed' },
    { label: 'Thursday', value: 'thu' },
    { label: 'Friday', value: 'fri' },
    { label: 'Saturday', value: 'sat' },
    { label: 'Sunday', value: 'sun' },
  ],
});

export default function MultipleListboxDemo() {
  return (
    <Listbox collection={days} selectionMode="multiple" defaultValue={['mon', 'wed', 'fri']}>
      <ListboxLabel>Select days</ListboxLabel>
      <ListboxContent>
        <For each={days.items}>
          {(item) => (
            <ListboxItem item={item}>
              <ListboxItemText>{item.label}</ListboxItemText>
              <ListboxItemIndicator />
            </ListboxItem>
          )}
        </For>
      </ListboxContent>
      <ListboxValueText />
    </Listbox>
  );
}