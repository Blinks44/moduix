import { createListCollection } from '@ark-ui/solid/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
} from '@moduix/solid/listbox';
import { Check as CheckIcon } from 'lucide-solid';
import { For } from 'solid-js';

const countries = createListCollection({
  items: [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
  ],
});

export default function BuildFromPartsListboxDemo() {
  return (
    <Listbox collection={countries}>
      <ListboxLabel>Select country</ListboxLabel>
      <ListboxContent>
        <For each={countries.items}>
          {(item) => (
            <ListboxItem item={item}>
              <ListboxItemText>{item.label}</ListboxItemText>
              <ListboxItemIndicator>
                <CheckIcon strokeWidth={3} />
              </ListboxItemIndicator>
            </ListboxItem>
          )}
        </For>
      </ListboxContent>
    </Listbox>
  );
}