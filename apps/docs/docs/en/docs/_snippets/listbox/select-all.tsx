import { createListCollection } from '@ark-ui/react/collection';
import { Button, Listbox, useListboxContext } from '@moduix/react';
import styles from '@/components/examples/listbox.module.css';

const days = createListCollection({
  items: [
    {
      label: 'Monday',
      value: 'mon',
    },
    {
      label: 'Tuesday',
      value: 'tue',
    },
    {
      label: 'Wednesday',
      value: 'wed',
    },
    {
      label: 'Thursday',
      value: 'thu',
    },
    {
      label: 'Friday',
      value: 'fri',
    },
    {
      label: 'Saturday',
      value: 'sat',
    },
    {
      label: 'Sunday',
      value: 'sun',
    },
  ],
});

function SelectAllTrigger() {
  const listbox = useListboxContext();
  const allValues = days.items.map((item) => item.value);
  const allSelected = listbox.value.length === allValues.length;
  return (
    <Button onClick={() => listbox.setValue(allSelected ? [] : allValues)}>
      {allSelected ? 'Clear all' : 'Select all'}
    </Button>
  );
}

export default function SelectAllListboxDemo() {
  return (
    <Listbox collection={days} className={styles.root} selectionMode="multiple">
      <Listbox.Label>Select days</Listbox.Label>
      <SelectAllTrigger />
      <Listbox.Content>
        {days.items.map((item) => (
          <Listbox.Item key={item.value} item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  );
}