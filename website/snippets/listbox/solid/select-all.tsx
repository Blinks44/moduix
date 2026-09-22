import { createListCollection } from '@ark-ui/solid/collection';
import { Button } from '@moduix/solid/button';
import { Listbox, ListboxContent, ListboxItem, ListboxItemIndicator, ListboxItemText, ListboxLabel, useListboxContext } from '@moduix/solid/listbox';
import { For } from 'solid-js';
import styles from '@/components/examples/listbox/listbox-select-all.module.css';

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

function SelectAllMeta() {
  const listbox = useListboxContext();
  const allValues = days.items.map((item) => item.value);
  const allSelected = () => listbox().value.length === allValues.length;

  return (
    <div>
      <output>Selected: {listbox().value.length}</output>
      <Button onClick={() => listbox().setValue(allSelected() ? [] : allValues)}>
        {allSelected() ? 'Clear all' : 'Select all'}
      </Button>
    </div>
  );
}

export default function SelectAllListboxDemo() {
  return (
    <Listbox collection={days} class={styles.root} selectionMode="multiple">
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
      <SelectAllMeta />
    </Listbox>
  );
}
