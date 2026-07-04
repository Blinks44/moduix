/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { createListCollection } from '@ark-ui/react/collection';
import { Listbox } from '@moduix/react';

const countries = createListCollection({
  items: [
    {
      label: 'United States',
      value: 'us',
    },
    {
      label: 'United Kingdom',
      value: 'uk',
    },
    {
      label: 'Canada',
      value: 'ca',
    },
  ],
});

export function ListboxDemo() {
  return (
    <Listbox collection={countries}>
      <Listbox.Label>Select country</Listbox.Label>
      <Listbox.Content>
        {countries.items.map((item) => (
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