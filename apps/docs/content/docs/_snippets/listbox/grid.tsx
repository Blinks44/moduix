/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { createGridCollection } from '@ark-ui/react/collection';
import { Listbox } from '@moduix/react';

const colors = createGridCollection({
  items: [
    {
      label: 'Red',
      value: 'red',
    },
    {
      label: 'Green',
      value: 'green',
    },
    {
      label: 'Blue',
      value: 'blue',
    },
  ],
  columnCount: 3,
});

export function GridListboxDemo() {
  return (
    <Listbox collection={colors}>
      <Listbox.Label>Pick a color</Listbox.Label>
      <Listbox.Content>
        {colors.items.map((item) => (
          <Listbox.Item key={item.value} item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  );
}

//#endregion