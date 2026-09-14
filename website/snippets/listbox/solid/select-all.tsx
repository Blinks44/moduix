import { createListCollection } from '@ark-ui/solid/collection';
import { Button } from '@moduix/solid/button';
import { Listbox, useListboxContext } from '@moduix/solid/listbox';
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
      <Listbox.Label>Select days</Listbox.Label>
      <Listbox.Content>
        <For each={days.items}>
          {(item) => (
            <Listbox.Item item={item}>
              <Listbox.ItemText>{item.label}</Listbox.ItemText>
              <Listbox.ItemIndicator />
            </Listbox.Item>
          )}
        </For>
      </Listbox.Content>
      <SelectAllMeta />
    </Listbox>
  );
}