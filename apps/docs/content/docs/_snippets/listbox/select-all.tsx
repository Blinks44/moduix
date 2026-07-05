/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { createListCollection } from '@ark-ui/react/collection';
import { useListboxContext } from '@ark-ui/react/listbox';
import { Button, Listbox } from '@moduix/react';

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

export function SelectAllListboxDemo() {
  return (
    <Listbox collection={days} selectionMode="multiple">
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

//#endregion